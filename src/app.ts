import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { verifyJWT } from "./infra/http/middleware/verify-jwt";
import cookie from "@fastify/cookie";
import { usersRoutes } from "./infra/http/routes/users.routes";

const app = fastify({
  logger: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refresh-token",
    signed: false,
  },
  sign: {
    expiresIn: "3s",
  },
});

app.register(cookie);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
  }

  return reply.status(500).send({ message: "Internal server error." });
});

app.register(usersRoutes);

app.get("/", { onRequest: verifyJWT }, (request, reply) => {
  const user = request.user.sub;
  reply.send({ user });
});

export { app };
