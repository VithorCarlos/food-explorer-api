import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindOneSnackUseCase } from "../../factories/make-find-one-snack-use-case";
import { SnackWithAttachmentPresenter } from "../../presenters/snack-with-attachment-presenter";

export const findOneSnackController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const findOneSchema = z.object({
    id: z.string(),
  });

  const { id } = findOneSchema.parse(request.params);
  try {
    const findOneSnackUseCase = makeFindOneSnackUseCase(request.server.prisma);

    const { snack: snackResponse } = await findOneSnackUseCase.execute({
      id,
    });

    const snack = SnackWithAttachmentPresenter.toHTTP(snackResponse);

    reply.status(200).send({ snack });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
