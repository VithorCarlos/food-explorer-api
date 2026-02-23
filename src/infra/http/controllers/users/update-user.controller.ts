import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateUserUseCase } from "../../factories/make-update-user-use-case";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";

export const updateUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
    password: z.string().optional(),
  });

  const { name, email, password } = registerSchema.parse(request.body);
  const userId = request.user.sub;

  try {
    const updateUserUseCase = makeUpdateUserUseCase(request.server.prisma);

    const { user } = await updateUserUseCase.execute({
      userId,
      name,
      email,
      password,
    });

    reply.status(204).send({
      user: {
        name: user.name,
        email: user.email,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    if (error instanceof UserDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
