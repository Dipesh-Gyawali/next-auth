import { PrismaClient } from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined;
}

//@ts-expect-error: Global Prisma instance type is not declared
export const db = globalThis.prisma || new PrismaClient();
//@ts-expect-error: Assigning to `globalThis.prisma` for reuse in development
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
