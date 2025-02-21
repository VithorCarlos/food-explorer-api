import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../factories/make-authenticate-use-case";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UserInvalidCredential } from "@/domain/errors/user-invalid-crendential";
import { TOKEN } from "@/domain/enums/token";

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

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const accessToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    reply
      .setCookie(TOKEN.REFRESH_TOKEN, refreshToken, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        secure: true,
        httpOnly: true,
      })
      .status(200)
      .send({ accessToken, refreshToken });
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
