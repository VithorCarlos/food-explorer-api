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
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(10),
  });

  const { page, perPage } = findManySchema.parse(request.query);

  try {
    const findManyFavoriteUseCase = makeFindManyFavoriteUseCase(
      request.server.prisma,
    );

    const result = await findManyFavoriteUseCase.execute({
      userId,
      page,
      perPage,
    });

    return reply.status(200).send({
      favorites: result.favorites.data.map(FavoriteDetailsPresenter.toHTTP),
      pagination: result.favorites.pagination,
    });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
