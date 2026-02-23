import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateFavoriteUseCase } from "../../factories/make-create-favorite-use-case";
import { FavoritePresenter } from "../../presenters/favorite-presenter";

export const createFavoriteController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createSchema = z.object({
    snackId: z.string(),
  });

  const { snackId } = createSchema.parse(request.body);

  const userId = request.user.sub;

  try {
    const createFavoriteUseCase = makeCreateFavoriteUseCase(
      request.server.prisma,
    );

    const favorite = await createFavoriteUseCase.execute({
      userId,
      snackId,
    });

    reply.status(201).send({ favorite: FavoritePresenter.toHTTP(favorite) });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
