import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchProductsUseCase } from "../../factories/make-search-products-use-case";
import { PRODUCT_CATEGORIES } from "generated/prisma/enums";
import { ProductWithAttachmentPresenter } from "../../presenters/product-with-attachment-presenter";

export const searchProductController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchSchema = z.object({
    page: z.number().optional(),
    category: z.enum(PRODUCT_CATEGORIES).optional(),
    perPage: z.number().optional(),
    title: z.string().optional(),
    ingredients: z.string().array().optional(),
  });

  const { page, perPage, category, title, ingredients } = searchSchema.parse(
    request.query,
  );

  try {
    const searchProductsUseCase = makeSearchProductsUseCase(
      request.server.prisma,
    );

    const result = await searchProductsUseCase.execute({
      page,
      perPage,
      ...(category && { category }),
      ...(title && { title }),
      ...(ingredients?.length && { ingredients }),
    });

    const products = result.products.data.map(
      ProductWithAttachmentPresenter.toHTTP,
    );

    reply
      .status(200)
      .send({ products, pagination: result.products.pagination });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
