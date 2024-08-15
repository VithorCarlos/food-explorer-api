import { errorCodes, FastifyReply, FastifyRequest } from "fastify";

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  await request.jwtVerify({ onlyCookie: true });

  try {
    const userId = request.user.sub;

    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: userId,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: userId,
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
