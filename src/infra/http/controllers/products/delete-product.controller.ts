import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteProductUseCase } from "../../factories/make-delete-product-use-case";
import { z } from "zod";

export const deleteProductController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.sub;
  const deleteSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteSchema.parse(request.params);

  try {
    const deleteProductUseCase = makeDeleteProductUseCase(
      request.server.prisma,
    );

    await deleteProductUseCase.execute({
      id,
      userId,
    });

    reply.status(200);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
