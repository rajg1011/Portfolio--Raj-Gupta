const { PrismaClient } = require("@prisma/client");

//Use prisma Client
const prisma = new PrismaClient();

module.exports = prisma;
