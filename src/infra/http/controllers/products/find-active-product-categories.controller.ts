import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindActiveProductCategoriesUseCase } from "../../factories/make-find-active-product-categories-use-case";

export const findActiceCategoriesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const findActiveProductCategoriesUseCase =
      makeFindActiveProductCategoriesUseCase(request.server.prisma);

    const { categories } = await findActiveProductCategoriesUseCase.execute();

    reply.status(200).send({ categories });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
