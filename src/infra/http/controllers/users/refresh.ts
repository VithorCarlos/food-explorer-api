import { FastifyReply, FastifyRequest } from "fastify";

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  await request.jwtVerify({ onlyCookie: true });

  try {
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
      .setCookie("refresh-token", refreshToken, {
        secure: true,
        sameSite: true,
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .send({ accessToken });
  } catch (error) {
    throw error;
  }
};
