import { env } from "@/env";
import { FastifyReply, FastifyRequest } from "fastify";
import { decode, verify } from "jsonwebtoken";

export const verifyJWT = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
) => {
  try {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return reply.status(401).send({
        message: "you do not have authorization of access",
      });
    }

    const [, accessToken] = authorization.split(" ");

    verify(accessToken, env.JWT_SECRET);

    const { sub: userId } = decode(accessToken);

    request.user = {
      sub: userId!,
    };

    done();
  } catch (error) {
    throw error;
  }
};
