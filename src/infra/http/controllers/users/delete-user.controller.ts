import { FastifyReply, FastifyRequest } from "fastify";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { makeDeleteUserUseCase } from "../../factories/make-delete-user-use-case";

export const deleteUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.sub;

  try {
    const deleteUserUseCase = makeDeleteUserUseCase(request.server.prisma);
    // const deleteRefreshTokenUserUseCase = makeDeleteRefreshTokenUseCase(
    //   request.server.prisma,
    // );

    await deleteUserUseCase.execute({
      userId,
    });

    // await deleteRefreshTokenUserUseCase.execute({ userId });

    reply.status(200).send();
  } catch (error) {
    if (error instanceof UserDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
