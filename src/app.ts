import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { verifyJWT } from "./infra/http/middleware/verify-jwt";
import cookie from "@fastify/cookie";
import { usersRoutes } from "./infra/http/routes/users.routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import { snackRoutes } from "./infra/http/routes/snacks.routes";
import { favoritesRoutes } from "./infra/http/routes/favorites.routes";

const app = fastify({
  logger: true,
});

app.register(cookie);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refresh-token",
    signed: false,
  },
  sign: {
    expiresIn: "15m",
  },
});

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API Food Explorer",
      description: "Digital menu",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/api",
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (error.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED") {
    return reply.status(401).send({
      message: "Authorization code expired",
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});

app.register(usersRoutes);
app.register(snackRoutes, { prefix: "snack" });
app.register(favoritesRoutes, { prefix: "favorite" });

app.get("/", { onRequest: verifyJWT }, (request, reply) => {
  const sub = request.user.sub;
  reply.send({ sub });
});

app.ready((err) => {
  if (err) throw err;
  app.swagger();
});

export { app };
