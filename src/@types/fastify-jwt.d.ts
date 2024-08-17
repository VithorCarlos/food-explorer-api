import { ROLE } from "@/domain/enums/role";
import "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {};
    user: {
      role: ROLE;
      sub: string;
    };
  }
}
