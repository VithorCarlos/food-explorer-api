import { FastifyReply, FastifyRequest } from "fastify";
import { FavoriteDoesNotExists } from "@/domain/errors/favorite-does-not-exists";
import { z } from "zod";
import { makeDeleteFavoriteUseCase } from "../../factories/make-delete-favorite-use-case";
import { FavoriteNotFoundForThisUser } from "@/domain/errors/favorite-not-found-for-this-user";

export const deleteFavorite = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.sub;

  const deleteSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteSchema.parse(request.body);

  try {
    const deleteFavoriteUseCase = makeDeleteFavoriteUseCase();

    await deleteFavoriteUseCase.execute({
      id,
      userId,
    });

    reply.status(200);
  } catch (error) {
    if (error instanceof FavoriteDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    if (error instanceof FavoriteNotFoundForThisUser) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
