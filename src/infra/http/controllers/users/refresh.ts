import { TOKEN } from "@/domain/enums/cookie";
import { FastifyReply, FastifyRequest } from "fastify";

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify({ onlyCookie: true });

    const { sub, role } = request.user;

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
          sub,
          expiresIn: "7d",
        },
      }
    );

    reply
      .setCookie(TOKEN.REFRESH_TOKEN, refreshToken, {
        secure: true,
        sameSite: true,
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .send({ accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Authorization token expired")) {
        reply
          .clearCookie(TOKEN.REFRESH_TOKEN)
          .status(403)
          .send({ message: "Code expired" });
      }
    }

    throw error;
  }
};
