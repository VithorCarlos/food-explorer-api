// src/infra/database/prisma/prisma.ts

import { PrismaClient } from "generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg(
      { connectionString: process.env.DATABASE_URL },
      { schema: process.env.DATABASE_SCHEMA },
    );

    super({
      adapter,
      log: ["error", "warn"],
    });
  }
}
