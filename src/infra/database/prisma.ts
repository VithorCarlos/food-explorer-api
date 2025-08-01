import { env } from "@/env";
import { PrismaClient } from "@/prisma/generated";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query"] : [],
});
