import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../factories/make-authenticate-use-case";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UserInvalidCredential } from "@/domain/errors/user-invalid-crendential";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = authenticationSchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "3d",
        },
      }
    );

    reply
      .setCookie("refresh-token", refreshToken, {
        secure: true,
        sameSite: true,
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof UserDoesNotExists) {
      reply.status(400).send({ message: error.message });
    }

    if (error instanceof UserInvalidCredential) {
      reply.status(400).send({ message: error.message });
    }
    throw error;
  }
};
