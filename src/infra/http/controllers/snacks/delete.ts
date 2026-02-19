import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteSnackUseCase } from "../../factories/make-delete-snack-use-case";
import { z } from "zod";

export const deleteSnack = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.sub;
  const deleteSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteSchema.parse(request.params);

  try {
    const deleteSnackUseCase = makeDeleteSnackUseCase(request.server.prisma);

    await deleteSnackUseCase.execute({
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
