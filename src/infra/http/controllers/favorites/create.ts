import { z } from "zod";
import { PrismaFavoriteAdapter } from "@/infra/database/adapters/prisma-favorite-adapter";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateFavoriteUseCase } from "../../factories/make-create-favorite-use-case";

export const createFavorite = async (
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

    const createdFavorite = await createFavoriteUseCase.execute({
      userId,
      snackId,
    });

    if (createdFavorite?.favorite?.id) {
      const favorite = PrismaFavoriteAdapter.toPrisma(
        createdFavorite?.favorite,
      );

      reply.status(201).send({ favorite });
    } else {
      reply.status(423).send({ message: "Snack's already favorited" });
    }
  } catch (error) {
    throw error;
  }
};
