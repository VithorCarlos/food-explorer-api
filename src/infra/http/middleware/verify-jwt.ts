import { FastifyJWT } from "@fastify/jwt";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

const verifyJWT: FastifyPluginAsync = async (app) => {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const token = request.headers.authorization?.split(" ")[1];

      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      try {
        const decoded = await request.jwt.verify<FastifyJWT["user"]>(token);
        request.user = decoded;
      } catch (error) {
        return reply.status(401).send({ message: "Unauthorized" });
      }
    }
  );
};

export default fp(verifyJWT);
