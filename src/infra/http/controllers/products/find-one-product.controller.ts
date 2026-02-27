import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindOneProductUseCase } from "../../factories/make-find-one-product-use-case";
import { ProductWithAttachmentPresenter } from "../../presenters/product-with-attachment-presenter";

export const findOneProductController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const findOneSchema = z.object({
    id: z.string(),
  });

  const { id } = findOneSchema.parse(request.params);
  try {
    const findOneProductUseCase = makeFindOneProductUseCase(
      request.server.prisma,
    );

    const { product: productResponse } = await findOneProductUseCase.execute({
      id,
    });

    const product = ProductWithAttachmentPresenter.toHTTP(productResponse);

    reply.status(200).send({ product });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
