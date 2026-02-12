import { env } from "@/env";
import { PrismaClient } from "generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = env.DATABASE_URL;
const databaseSchema = env.DATABASE_SCHEMA;

const adapter = new PrismaPg(
  { connectionString: databaseUrl },
  { schema: databaseSchema },
);

export const prisma = new PrismaClient({
  adapter,
  log: ["error", "warn"],
});
