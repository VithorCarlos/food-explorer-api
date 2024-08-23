import { FastifyReply, FastifyRequest } from "fastify";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { makeDeleteUserUseCase } from "../../factories/make-delete-user-use-case";
import { makeDeleteRefreshTokenUseCase } from "../../factories/make-delete-refresh-token-use-case";

export const deleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.sub;

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();
    const deleteRefreshTokenUserUseCase = makeDeleteRefreshTokenUseCase();

    await deleteUserUseCase.execute({
      userId,
    });

    await deleteRefreshTokenUserUseCase.execute({ userId });

    reply.status(200);
  } catch (error) {
    if (error instanceof UserDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
