import { FastifyReply, FastifyRequest } from "fastify";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UserInvalidCredential } from "@/domain/errors/user-invalid-crendential";

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  await request.jwtVerify({ onlyCookie: true });

  try {
    const userId = request.user.sub;

    const token = await reply.jwtSign(
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
      .send({ token });
  } catch (error) {
    throw error;
  }
};
