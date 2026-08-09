import { Body, Controller, ExecutionContext, ForbiddenException, Get, Injectable, Module, Post, Req, SetMetadata, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import * as argon2 from 'argon2';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { CanActivate } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { roles: { include: { role: true } } },
    });

    if (!user || !user.isActive || !(await argon2.verify(user.passwordHash, dto.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const roles = user.roles.map((x) => x.role.name);
    const payload = { sub: user.id, email: user.email, roles };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'dev-access',
      expiresIn: '15m',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh',
      expiresIn: '7d',
    });

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: await argon2.hash(refreshToken),
        expiresAt: new Date(Date.now() + 6048e5),
      },
    });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email, roles },
    };
  }

  async refresh(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh',
      });
      const records = await this.prisma.refreshToken.findMany({
        where: { userId: payload.sub, revokedAt: null, expiresAt: { gt: new Date() } },
      });

      if (!(await Promise.all(records.map((x) => argon2.verify(x.tokenHash, token)))).some(Boolean)) {
        throw new Error();
      }

      return this.loginWithUser(payload.sub);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async loginWithUser(id: string) {
    const u = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
    const roles = u.roles.map((x) => x.role.name);
    return {
      accessToken: await this.jwt.signAsync({ sub: u.id, email: u.email, roles }, {
        secret: process.env.JWT_ACCESS_SECRET || 'dev-access',
        expiresIn: '15m',
      }),
    };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.roles) {
      throw new ForbiddenException('Access denied');
    }

    const hasRole = requiredRoles.some((role) => user.roles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() d: LoginDto) {
    return this.auth.login(d);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') t: string) {
    return this.auth.refresh(t);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() r: any) {
    return r.user;
  }
}

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [JwtModule, AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}

