import fastify from "fastify";
import { env } from "./env";
import cookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { usersRoutes } from "./infra/http/routes/users.routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import { snackRoutes } from "./infra/http/routes/snacks.routes";
import { favoritesRoutes } from "./infra/http/routes/favorites.routes";
import { globalErrorHandler } from "./infra/http/middleware/global-error-handler";
import multipart from "@fastify/multipart";
import { uploadRoutes } from "./infra/http/routes/upload.routes";
import { PrismaService } from "./infra/database/prisma";
import { TOKEN } from "./domain/enums/token";

export async function buildApp() {
  const app = fastify({
    logger: {
      level: "warn",
    },
  });
  const prisma = new PrismaService();

  app.decorate("prisma", prisma);

  app.register(multipart, {
    limits: { fileSize: 2 * 1024 * 1024 }, // 2mb
  });

  app.register(cookie, { secret: "my-secret" });

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      signed: false,
      cookieName: TOKEN.REFRESH_TOKEN,
    },
    sign: {
      expiresIn: "15m",
    },
  });

  app.register(cors, {
    origin: env.PUBLIC_FRONT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
    routePrefix: "/doc",
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
  app.register(usersRoutes);
  app.register(snackRoutes, { prefix: "snack" });
  app.register(favoritesRoutes, { prefix: "favorite" });
  app.register(uploadRoutes, { prefix: "upload" });

  app.setErrorHandler(globalErrorHandler);

  app.ready((err) => {
    if (err) throw err;
    app.swagger();
  });

  return app;
}
