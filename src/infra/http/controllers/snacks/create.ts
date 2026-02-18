import { z } from "zod";
import { makeCreateSnackUseCase } from "../../factories/make-create-snack-use-case";
import { PrismaSnackAdapter } from "@/infra/database/adapters/prisma-snack-adapter";
import { FastifyReply, FastifyRequest } from "fastify";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";

export const createSnack = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(FOOD_CATEGORIES),
    ingredients: z.string().array(),
    price: z.number().min(0),
    attachmentId: z.string(),
  });

  const { title, category, ingredients, price, description, attachmentId } =
    createSchema.parse(request.body);

  const userId = request.user.sub;

  try {
    const createSnackUseCase = makeCreateSnackUseCase(request.server.prisma);

    const { snack: createdSnack } = await createSnackUseCase.execute({
      title,
      category,
      ingredients,
      userId,
      price,
      description,
      attachmentId,
    });

    const snack = PrismaSnackAdapter.toPrisma(createdSnack);

    reply.status(201).send({ snack: { ...snack, attachmentId } });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }
    throw error;
  }
};
