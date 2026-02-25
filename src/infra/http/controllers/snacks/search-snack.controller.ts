import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchSnacksUseCase } from "../../factories/make-search-snacks-use-case";
import { SnackWithAttachmentPresenter } from "../../presenters/snack-with-attachment-presenter";

export const searchSnackController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchSchema = z.object({
    page: z.number().optional(),
    category: z.string().optional(),
    perPage: z.number().optional(),
    title: z.string().optional(),
    ingredients: z.string().array().optional(),
  });

  const { page, perPage, category, title, ingredients } = searchSchema.parse(
    request.query,
  );

  try {
    const searchSnacksUseCase = makeSearchSnacksUseCase(request.server.prisma);

    const result = await searchSnacksUseCase.execute({
      page,
      perPage,
      category,
      title,
      ingredients,
    });

    const snacks = result.snacks.data.map(SnackWithAttachmentPresenter.toHTTP);

    reply.status(200).send({ snacks, pagination: result.snacks.pagination });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
