import { z } from "zod";
import { PrismaSnackAdapter } from "@/infra/database/adapters/prisma-snack-adapter";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateSnackUseCase } from "../../factories/make-update-snack-use-case";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";

export const updateSnack = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const updateSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().url().optional(),
    category: z.nativeEnum(FOOD_CATEGORIES).optional(),
    ingredients: z.string().array().optional(),
    price: z.number().optional(),
  });

  const { id, title, category, ingredients, price, description, imageUrl } =
    updateSchema.parse(request.body);
  const userId = request.user.sub;

  try {
    const updateSnackUseCase = makeUpdateSnackUseCase();

    const { snack: updatedSnack } = await updateSnackUseCase.execute({
      id,
      title,
      category,
      ingredients,
      userId,
      price,
      description,
      imageUrl,
    });

    const snack = PrismaSnackAdapter.toPrisma(updatedSnack);

    reply.status(201).send({ snack });
  } catch (error) {
    if (error instanceof SnackDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    if (error instanceof SnackNotFoundForThisUser) {
      reply.status(400).send({ message: error.message });
    }
    throw error;
  }
};
