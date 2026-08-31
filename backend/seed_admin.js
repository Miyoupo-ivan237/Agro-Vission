// backend/seed_admin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'ivanmiyoupo@gmail.com';
  const plainPassword = 'miyoupo10';

  console.log('Checking for existing admin user...');
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    console.log(`Admin user ${email} already exists.`);
    // Optionally update the password if it's there
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    await prisma.user.update({
      where: { email },
      data: {
        password: passwordHash,
        role: 'admin'
      }
    });
    console.log('Admin password updated successfully.');
  } else {
    console.log(`Creating new admin user ${email}...`);
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    
    await prisma.user.create({
      data: {
        name: 'Ivan Miyoupo',
        email: email,
        password: passwordHash,
        passwordHash: passwordHash,
        phone: '+237 600000000',
        phoneNumber: '+237 600000000',
        role: 'admin',
        location: 'Cameroon Headquarters',
        farmSize: 'N/A',
        preferredCrop: 'All'
      }
    });
    console.log('Admin user created successfully.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
