import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchSnacksUseCase } from "../../factories/make-search-snacks-use-case";
import { SnackWithAttachmentPresenter } from "../../presenters/snack-with-attachment-presenter";

export const searchSnack = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchSchema = z.object({
    page: z.number().optional(),
    category: z.string(),
    perPage: z.number().optional(),
    title: z.string().optional(),
    ingredients: z.string().array().optional(),
  });

  const { page, perPage, category, title, ingredients } = searchSchema.parse(
    request.query,
  );

  try {
    const searchSnacksUseCase = makeSearchSnacksUseCase(request.server.prisma);

    const { snacks: filteredSnacks } = await searchSnacksUseCase.execute({
      page,
      perPage,
      category,
      title,
      ingredients,
    });

    const snanks = filteredSnacks.map(SnackWithAttachmentPresenter.toHTTP);

    reply.status(200).send(snanks);
  } catch (error) {
    throw error;
  }
};
