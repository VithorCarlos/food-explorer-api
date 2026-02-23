import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindManyFavoriteUseCase } from "../../factories/make-find-many-favorites-use-case";
import { FavoriteDetailsPresenter } from "../../presenters/favorite-details-presenter";

export const findManyFavoritesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.sub;

  const findManySchema = z.object({
    page: z.number().optional(),
    perPage: z.number().optional(),
  });

  const { page, perPage } = findManySchema.parse(request.query);

  try {
    const findManyFavoriteUseCase = makeFindManyFavoriteUseCase(
      request.server.prisma,
    );

    const { favorites } = await findManyFavoriteUseCase.execute({
      userId,
      page,
      perPage,
    });

    if (favorites) {
      reply
        .status(200)
        .send({ favorites: favorites.map(FavoriteDetailsPresenter.toHTTP) });
    }
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
