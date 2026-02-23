import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindActiveCategoriesUseCase } from "../../factories/make-find-active-categories-use-case";

export const findActiceCategoriesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const findActiveCategoriesUseCase = makeFindActiveCategoriesUseCase(
      request.server.prisma,
    );

    const { categories } = await findActiveCategoriesUseCase.execute();

    reply.status(200).send({ categories });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
