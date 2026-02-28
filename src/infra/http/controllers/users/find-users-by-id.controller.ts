import { FastifyReply, FastifyRequest } from "fastify";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { makeFindUserByIdUseCase } from "../../factories/make-find-user-by-id-use-case";

export const findUserByIdController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.sub;

  try {
    const findUserByIdUseCase = makeFindUserByIdUseCase(request.server.prisma);

    const { user } = await findUserByIdUseCase.execute({
      userId,
    });

    const userMapper = {
      id: user?.id.toString(),
      name: user?.name,
      email: user?.email,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };

    reply.status(200).send({ user: userMapper });
  } catch (error) {
    if (error instanceof UserDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
