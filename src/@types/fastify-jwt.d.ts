import { ROLE } from "@/domain/enums/role";
import "@fastify/jwt";
import { PrismaService } from "@/infra/database/prisma";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
      role: ROLE;
    };
  }
}

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaService;
  }
}
