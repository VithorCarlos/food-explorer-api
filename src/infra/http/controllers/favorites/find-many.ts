import { FastifyReply, FastifyRequest } from "fastify";
import { FavoriteDoesNotExists } from "@/domain/errors/favorite-does-not-exists";
import { z } from "zod";
import { FavoriteNotFoundForThisUser } from "@/domain/errors/favorite-not-found-for-this-user";
import { makeFindManyFavoriteUseCase } from "../../factories/make-find-many-favorites-use-case";
import { PrismaFavoriteAdapter } from "@/infra/database/adapters/prisma-favorite-adapter";

export const findManyFavorites = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.sub;

  const findManySchema = z.object({
    page: z.number().optional(),
    perPage: z.number().optional(),
  });

  const { page, perPage } = findManySchema.parse(request.query);

  try {
    const findManyFavoriteUseCase = makeFindManyFavoriteUseCase();

    const { favorites: filteredFavorites } =
      await findManyFavoriteUseCase.execute({
        userId,
        page,
        perPage,
      });

    const favorites = filteredFavorites.map((favorite) =>
      PrismaFavoriteAdapter.toBind(favorite)
    );

    reply.status(200).send({ favorites });
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
