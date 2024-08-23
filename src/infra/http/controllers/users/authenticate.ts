import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../factories/make-authenticate-use-case";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UserInvalidCredential } from "@/domain/errors/user-invalid-crendential";
import { makeRefreshTokenUseCase } from "../../factories/make-refresh-token-use-case";
import { decode } from "jsonwebtoken";
import { PrismaRefreshTokenAdapter } from "@/infra/database/adapters/prisma-refresh-token-adapter";

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
    const refreshTokenUseCase = makeRefreshTokenUseCase();

    const { accessToken } = await authenticateUseCase.execute({
      email,
      password,
    });

    const { sub } = decode(accessToken);

    const { refreshToken: createRefreshToken } =
      await refreshTokenUseCase.execute({
        userId: sub!,
      });

    const refreshToken = PrismaRefreshTokenAdapter.toPrisma(createRefreshToken);

    reply.status(200).send({ accessToken, refreshToken });
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
