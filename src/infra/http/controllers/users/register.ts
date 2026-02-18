import { UserAlreadyExists } from "@/domain/errors/user-already-exists";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUserUseCase } from "../../factories/make-register-user-use-case";

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
  });

  const { name, email, password } = registerSchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUserUseCase(request.server.prisma);

    await registerUseCase.execute({
      name,
      email,
      password,
    });

    reply.status(200);
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
