import { FastifyReply, FastifyRequest } from "fastify";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { makeDeleteSnackUseCase } from "../../factories/make-delete-snack-use-case";
import { z } from "zod";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";

export const deleteSnack = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.sub;
  const deleteSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteSchema.parse(request.body);

  try {
    const deleteSnackUseCase = makeDeleteSnackUseCase(request.server.prisma);

    await deleteSnackUseCase.execute({
      id,
      userId,
    });

    reply.status(200);
  } catch (error) {
    if (error instanceof SnackDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    if (error instanceof SnackNotFoundForThisUser) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
