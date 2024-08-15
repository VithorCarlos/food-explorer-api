import { FastifyInstance } from "fastify";
import { authenticate } from "../controllers/users/authenticate";
import { register } from "../controllers/users/register";

export const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/session", authenticate);
  fastify.post("/register", register);
};
