import { z } from "zod";
import { makeCreateSnackUseCase } from "../../factories/make-create-snack-use-case";
import { PrismaSnackAdapter } from "@/infra/database/adapters/prisma-snack-adapter";
import { FastifyReply, FastifyRequest } from "fastify";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";

export const createSnackController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.enum(FOOD_CATEGORIES),
    ingredients: z.string().array().optional(),
    price: z.number().min(0),
    attachmentId: z.string().optional(),
  });

  const { title, category, ingredients, price, description, attachmentId } =
    createSchema.parse(request.body);

  const userId = request.user.sub;

  const createSnackUseCase = makeCreateSnackUseCase(request.server.prisma);

  const { snack: createdSnack } = await createSnackUseCase.execute({
    title,
    category,
    ...(ingredients && { ingredients }),
    ...(description && { description }),
    ...(attachmentId && { attachmentId }),
    userId,
    price,
  });

  const snack = PrismaSnackAdapter.toPrisma(createdSnack);

  return reply.status(201).send({ snack: { ...snack, attachmentId } });
};
