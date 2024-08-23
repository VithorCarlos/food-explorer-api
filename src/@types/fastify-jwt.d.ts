import { ROLE } from "@/domain/enums/role";
import "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      sub: string;
    };
  }
}
