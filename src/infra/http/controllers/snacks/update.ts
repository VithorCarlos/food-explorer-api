import { z } from "zod";
import { PrismaSnackAdapter } from "@/infra/database/adapters/prisma-snack-adapter";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateSnackUseCase } from "../../factories/make-update-snack-use-case";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";

export const updateSnack = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const updateSchema = z.object({
    snackId: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(FOOD_CATEGORIES).optional(),
    ingredients: z.string().array().optional(),
    price: z.number().optional(),
    attachmentId: z.string().optional(),
  });

  const {
    snackId,
    title,
    category,
    ingredients,
    price,
    description,
    attachmentId,
  } = updateSchema.parse(request.body);
  const userId = request.user.sub;

  try {
    const updateSnackUseCase = makeUpdateSnackUseCase(request.server.prisma);

    const { snack: updatedSnack } = await updateSnackUseCase.execute({
      snackId,
      attachmentId,
      title,
      category,
      ingredients,
      userId,
      price,
      description,
    });

    const snack = PrismaSnackAdapter.toPrisma(updatedSnack);

    reply.status(201).send({ snack });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
