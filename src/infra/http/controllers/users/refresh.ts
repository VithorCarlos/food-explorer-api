import { FastifyReply, FastifyRequest } from "fastify";
import { RefreshTokenNotFoundError } from "@/domain/errors/refresh-token-not-found";

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify({ onlyCookie: true });

    const { role, sub } = request.user;

    const accessToken = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: request.user.sub,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({
        accessToken,
      });
  } catch (error) {
    if (error instanceof RefreshTokenNotFoundError) {
      reply.status(401).send({ message: "refresh token not found" });
    }
    throw error;
  }
};
