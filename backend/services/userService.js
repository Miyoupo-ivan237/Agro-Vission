const prisma = require('../config/database');

async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

module.exports = { findUserById, findUserByEmail };
