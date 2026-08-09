import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const p = new PrismaClient();
const roles = ['SUPER_ADMIN','SCHOOL_ADMIN','PRINCIPAL','TEACHER','ACCOUNTANT','ADMISSION_STAFF','RECEPTION','PARENT','STUDENT'];

async function main() {
  const school = await p.school.upsert({ where: { id: 'northstar-school' }, update: {}, create: { id: 'northstar-school', name: 'Northstar International School', establishedYear: 1987, email: 'hello@northstar.edu', phone: '+91 80 4000 0000', address: '12 Horizon Avenue, Bengaluru' } });
  const createdRoles = await Promise.all(roles.map(name => p.role.upsert({ where: { name }, update: {}, create: { name } })));
  const adminRole = createdRoles.find(role => role.name === 'SCHOOL_ADMIN')!;
  const teacherRole = createdRoles.find(role => role.name === 'TEACHER')!;
  const parentRole = createdRoles.find(role => role.name === 'PARENT')!;
  const admissionRole = createdRoles.find(role => role.name === 'ADMISSION_STAFF')!;
  const accountantRole = createdRoles.find(role => role.name === 'ACCOUNTANT')!;

  const admin = await p.user.upsert({
    where: { email: 'admin@northstar.edu' },
    update: {},
    create: {
      email: 'admin@northstar.edu',
      passwordHash: await argon2.hash('Admin@12345'),
      firstName: 'Aarav',
      lastName: 'Mehta',
      schoolId: school.id,
    },
  });
  await p.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: adminRole.id } },
    update: {},
    create: { userId: admin.id, roleId: adminRole.id },
  });

  const teacherUser = await p.user.upsert({
    where: { email: 'priya@northstar.edu' },
    update: {},
    create: {
      email: 'priya@northstar.edu',
      passwordHash: await argon2.hash('Teacher@12345'),
      firstName: 'Priya',
      lastName: 'Kumar',
      schoolId: school.id,
    },
  });
  await p.userRole.upsert({
    where: { userId_roleId: { userId: teacherUser.id, roleId: teacherRole.id } },
    update: {},
    create: { userId: teacherUser.id, roleId: teacherRole.id },
  });
  await p.teacher.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: { userId: teacherUser.id, employeeNo: 'TS-101' },
  });

  const parentUser = await p.user.upsert({
    where: { email: 'neha@northstar.edu' },
    update: {},
    create: {
      email: 'neha@northstar.edu',
      passwordHash: await argon2.hash('Parent@12345'),
      firstName: 'Neha',
      lastName: 'Sharma',
      schoolId: school.id,
    },
  });
  await p.userRole.upsert({
    where: { userId_roleId: { userId: parentUser.id, roleId: parentRole.id } },
    update: {},
    create: { userId: parentUser.id, roleId: parentRole.id },
  });
  const parent = await p.parent.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: { userId: parentUser.id },
  });

  const year = await p.academicYear.upsert({
    where: { name: '2026-2027' },
    update: {},
    create: { name: '2026-2027', startsOn: new Date('2026-04-01'), endsOn: new Date('2027-03-31'), isCurrent: true, schoolId: school.id },
  });
  const cls = await p.class.upsert({
    where: { schoolId_name: { schoolId: school.id, name: 'Grade 8' } },
    update: {},
    create: { schoolId: school.id, name: 'Grade 8' },
  });
  const sectionA = await p.section.upsert({
    where: { classId_name: { classId: cls.id, name: 'A' } },
    update: {},
    create: { classId: cls.id, name: 'A' },
  });
  const sectionB = await p.section.upsert({
    where: { classId_name: { classId: cls.id, name: 'B' } },
    update: {},
    create: { classId: cls.id, name: 'B' },
  });

  const students = [
    ['NS-2601', 'Ishaan', 'Kapoor'],
    ['NS-2602', 'Ananya', 'Rao'],
    ['NS-2603', 'Vihaan', 'Singh'],
  ];
  for (const [admissionNo, firstName, lastName] of students) {
    const student = await p.student.upsert({
      where: { admissionNo },
      update: {},
      create: { admissionNo, firstName, lastName, schoolId: school.id },
    });
    await p.enrollment.upsert({
      where: { studentId_academicYearId: { studentId: student.id, academicYearId: year.id } },
      update: {},
      create: { studentId: student.id, academicYearId: year.id, sectionId: sectionA.id },
    });
    await p.studentParent.upsert({
      where: { studentId_parentId: { studentId: student.id, parentId: parent.id } },
      update: {},
      create: { studentId: student.id, parentId: parent.id, relationship: 'Mother' },
    });
  }

  await p.admissionEnquiry.upsert({
    where: { id: 'demo-enquiry' },
    update: {},
    create: { id: 'demo-enquiry', applicantName: 'Mira Sharma', email: 'mira@example.com', phone: '+91 98765 43210', interestedClass: 'Grade 8', notes: 'Looking for a nurturing community.', status: 'NEW' },
  });

  const feeCategory = await p.feeCategory.upsert({ where: { name: 'Tuition' }, update: {}, create: { name: 'Tuition' } });
  await p.invoice.upsert({
    where: { invoiceNo: 'INV-00001' },
    update: {},
    create: { invoiceNo: 'INV-00001', studentId: (await p.student.findUnique({ where: { admissionNo: 'NS-2601' } }))!.id, categoryId: feeCategory.id, amount: 24800, dueDate: new Date('2026-06-01'), status: 'ISSUED' },
  });

  await p.announcement.upsert({
    where: { id: 'welcome-announcement' },
    update: {},
    create: { id: 'welcome-announcement', title: 'New academic year begins', body: 'Northstar welcomes students back for a year of innovation, growth and community.', status: 'PUBLISHED' },
  });

  await p.websiteContent.upsert({
    where: { key: 'homepage' },
    update: {},
    create: {
      key: 'homepage',
      title: 'A place to become',
      body: JSON.stringify({
        eyebrow: 'Northstar International School',
        description: 'A generous education for curious minds, courageous hearts and a changing world.',
        heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85',
        stats: [
          ['38', 'years of excellence'],
          ['1,840', 'students finding their path'],
          ['142', 'educators and mentors'],
          ['96%', 'university placement'],
        ],
      }),
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  await p.auditLog.create({
    data: { action: 'SEED', module: 'SYSTEM', entity: 'INITIAL_DATA', metadata: JSON.stringify({ note: 'Seed data loaded' }) },
  });
}
main().finally(()=>p.$disconnect());
