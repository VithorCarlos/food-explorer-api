import { TOKEN } from "@/domain/enums/token";
import { RefreshTokenNotFoundError } from "@/domain/errors/refresh-token-not-found";
import { env } from "@/env";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const refreshToken = request.cookies[TOKEN.REFRESH_TOKEN];
    if (!refreshToken) {
      throw new RefreshTokenNotFoundError();
    }

    const payload = jwt.verify(refreshToken, env.JWT_SECRET) as {
      sub: string;
      role: string;
    };

    const { sub, role } = payload;

    const newAccessToken = await reply.jwtSign(
      { role },
      { sub, expiresIn: "15m" },
    );

    const newRefreshToken = jwt.sign({ role }, env.JWT_SECRET, {
      subject: sub,
      expiresIn: "7d",
    });

    reply.setCookie(TOKEN.REFRESH_TOKEN, newRefreshToken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
    });

    reply.send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (error instanceof RefreshTokenNotFoundError) {
      reply.status(401).send({ message: error.message });
    }

    reply.status(401).send({
      message: "invalid refresh token",
    });
  }
};
