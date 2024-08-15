import { FastifyInstance } from "fastify";
import { authenticate } from "../controllers/users/authenticate";
import { registerUser } from "../controllers/users/register";
import { updateUser } from "../controllers/users/update";
import { verifyJWT } from "../middleware/verify-jwt";
import { deleteUser } from "../controllers/users/delete";

export const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/session", authenticate);
  fastify.post("/", registerUser);
  fastify.put("/", { onRequest: [verifyJWT] }, updateUser);
  fastify.delete("/", { onRequest: [verifyJWT] }, deleteUser);
};
