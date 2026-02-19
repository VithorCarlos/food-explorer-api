import { ROLE } from "@/domain/enums/role";
import { FastifyReply, FastifyRequest } from "fastify";

export function verifyRole(
  roleToVerify: ROLE.ADMIN | ROLE.CLIENT | ROLE.RESTAURANT,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      reply.status(401).send({ message: "Unauthorized" });
    }
  };
}
