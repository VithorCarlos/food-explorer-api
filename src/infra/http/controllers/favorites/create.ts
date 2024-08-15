import { z } from "zod";
import { PrismaFavoriteAdapter } from "@/infra/database/adapters/prisma-favorite-adapter";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateFavoriteUseCase } from "../../factories/make-create-favorite-use-case";

export const createFavorite = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const createSchema = z.object({
    snackId: z.string(),
  });

  const { snackId } = createSchema.parse(request.body);

  const userId = request.user.sub;

  try {
    const createFavoriteUseCase = makeCreateFavoriteUseCase();

    const { favorite: createdFavorite } = await createFavoriteUseCase.execute({
      userId,
      snackId,
    });

    const favorite = PrismaFavoriteAdapter.toPrisma(createdFavorite);

    reply.status(201).send({ favorite });
  } catch (error) {
    throw error;
  }
};
