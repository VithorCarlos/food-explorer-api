import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteFavoriteUseCase } from "../../factories/make-delete-favorite-use-case";

export const deleteFavoriteController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.sub;

  const deleteSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteSchema.parse(request.body);

  try {
    const deleteFavoriteUseCase = makeDeleteFavoriteUseCase(
      request.server.prisma,
    );

    await deleteFavoriteUseCase.execute({
      id,
      userId,
    });

    reply.status(200);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
