import { ROLE } from "@/domain/enums/role";
import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {};
    user: {
      role: ROLE;
      sub: string;
    };
  }
}
