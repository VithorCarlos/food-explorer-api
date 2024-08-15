import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateUserUseCase } from "../../factories/make-update-user-use-case";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";

export const updateUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
  });

  const { name, email, password } = registerSchema.parse(request.body);
  const userId = request.user.sub;

  try {
    const updateUserUseCase = makeUpdateUserUseCase();

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
        updated_at: user.updated_at,
      },
    });
  } catch (error) {
    if (error instanceof UserDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
