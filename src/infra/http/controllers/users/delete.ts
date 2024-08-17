import { FastifyReply, FastifyRequest } from "fastify";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { makeDeleteUserUseCase } from "../../factories/make-delete-user-use-case";
import { TOKEN } from "@/domain/enums/cookie";

export const deleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.sub;

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();

    await deleteUserUseCase.execute({
      userId,
    });

    reply.clearCookie(TOKEN.REFRESH_TOKEN).status(200);
  } catch (error) {
    if (error instanceof UserDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
