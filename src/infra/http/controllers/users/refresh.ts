import { FastifyReply, FastifyRequest } from "fastify";
import { makeRefreshTokenUseCase } from "../../factories/make-refresh-token-use-case";
import { decode } from "jsonwebtoken";
import { z } from "zod";
import { makeGenerateRefreshTokenUseCase } from "../../factories/make-generate-refresh-token-use-case";
import { RefreshTokenNotFoundError } from "@/domain/errors/refresh-token-not-found";

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const refreshTokenSchema = z.object({
      id: z.string(),
    });

    const { id } = refreshTokenSchema.parse(request.body);

    const refreshTokenUseCase = makeGenerateRefreshTokenUseCase();

    const refreshToken = await refreshTokenUseCase.execute({
      id,
    });

    if (refreshToken?.accessToken) {
      return reply.status(200).send(refreshToken);
    }
  } catch (error) {
    if (error instanceof RefreshTokenNotFoundError) {
      reply.status(401).send({ message: "refresh token not found" });
    }
    throw error;
  }
};
