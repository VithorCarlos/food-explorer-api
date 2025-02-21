import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchSnacksUseCase } from "../../factories/make-search-snacks-use-case";
import { PrismaSnackAdapter } from "@/infra/database/adapters/prisma-snack-adapter";

export const searchSnack = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const searchSchema = z.object({
    page: z.number().optional(),
    perPage: z.number().optional(),
    title: z.string().optional(),
    ingredients: z.string().array().optional(),
  });

  const { page, perPage, title, ingredients } = searchSchema.parse(
    request.query
  );

  try {
    const searchSnacksUseCase = makeSearchSnacksUseCase();

    const { snacks: filteredSnacks } = await searchSnacksUseCase.execute({
      page,
      perPage,
      title,
      ingredients,
    });
    console.log(filteredSnacks);
    const snanks = filteredSnacks.map(PrismaSnackAdapter.toPrisma);

    reply.status(201).send(snanks);
  } catch (error) {
    throw error;
  }
};
