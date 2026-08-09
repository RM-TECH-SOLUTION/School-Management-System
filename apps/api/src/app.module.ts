import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { OperationsModule } from './operations';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, OperationsModule, PrismaModule],
})
export class AppModule {}
