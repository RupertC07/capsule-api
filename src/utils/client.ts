import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Check if prisma instance already exists
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Assign to global for hot-reloading in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
