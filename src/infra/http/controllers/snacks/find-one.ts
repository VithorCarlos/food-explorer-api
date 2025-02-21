import { FastifyReply, FastifyRequest } from "fastify";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { z } from "zod";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { makeFindOneSnackUseCase } from "../../factories/make-find-one-snack-use-case";

export const findOneSnack = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const findoneSchema = z.object({
    id: z.string(),
  });

  const { id } = findoneSchema.parse(request.params);

  try {
    const findOneSnackUseCase = makeFindOneSnackUseCase();

    const snack = await findOneSnackUseCase.execute({
      id,
    });

    reply.status(200).send({ snack });
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
