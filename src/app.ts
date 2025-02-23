import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import cookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { usersRoutes } from "./infra/http/routes/users.routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import { snackRoutes } from "./infra/http/routes/snacks.routes";
import { favoritesRoutes } from "./infra/http/routes/favorites.routes";
import { TOKEN } from "./domain/enums/token";
import { globalErrorHandler } from "./infra/http/middleware/global-error-handler";

const app = fastify({
  logger: {
    level: "warn",
  },
});

app.register(cookie);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: TOKEN.REFRESH_TOKEN,
    signed: false,
  },
  sign: {
    expiresIn: "15m",
  },

  verify: {
    extractToken: (request) => {
      // if (request.url === "/refresh-token") {
      // return request.cookies && request.cookies.refreshToken;
      // } else {
      return (
        request.headers.authorization &&
        request.headers.authorization.split(" ")[1]
      );
      // }
    },
  },
});

app.register(cors, {
  credentials: true,
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

app.setErrorHandler(globalErrorHandler);

app.ready((err) => {
  if (err) throw err;
  app.swagger();
});

export { app };
