import { ROLE } from "@/domain/enums/role";
import { prisma } from "@/infra/database/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export function verifyRole(
  roleToVerify: ROLE.ADMIN | ROLE.CLIENT | ROLE.RESTAURANT
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.user.sub;

    const user = await prisma.users.findFirst({ where: { id: userId } });

    if (!user) {
      return reply
        .status(401)
        .send({ message: "unauthorized: user not found" });
    }

    if (user.role !== roleToVerify) {
      return reply.status(403).send({ message: "access denied" });
    }
  };
}
