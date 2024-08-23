import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import cookie from "@fastify/cookie";
import { usersRoutes } from "./infra/http/routes/users.routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import { snackRoutes } from "./infra/http/routes/snacks.routes";
import { favoritesRoutes } from "./infra/http/routes/favorites.routes";

const app = fastify({
  logger: {
    level: "warn",
  },
});

app.register(cors, {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
});

app.register(cookie);

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
  routePrefix: "/doc",
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

  if (error.message.includes("jwt expired")) {
    return reply.status(401).send({
      message: "token is expired or not valid",
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

app.ready((err) => {
  if (err) throw err;
  app.swagger();
});

export { app };
