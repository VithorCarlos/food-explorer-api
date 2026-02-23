import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../factories/make-authenticate-use-case";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UserInvalidCredential } from "@/domain/errors/user-invalid-crendential";
import { TOKEN } from "@/domain/enums/token";
import { env } from "@/env";

export const authenticateUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticationSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const { email, password } = authenticationSchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase(request.server.prisma);

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const accessToken = await reply.jwtSign(
      { role: user.role },
      { sub: user.id.toString(), expiresIn: "15m" },
    );

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      { sub: user.id.toString(), expiresIn: "7d" },
    );

    reply
      .setCookie(TOKEN.ACCESS_TOKEN, accessToken, {
        path: "/",
        maxAge: 15 * 60,
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .setCookie(TOKEN.REFRESH_TOKEN, refreshToken, {
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        secure: env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
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
