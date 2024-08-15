import { UserAlreadyExists } from "@/domain/errors/user-already-exists";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUserUseCase } from "../../factories/make-register-user-use-case";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = registerSchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUserUseCase();

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
