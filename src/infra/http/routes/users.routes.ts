import { FastifyInstance } from "fastify";
import { authenticateUserController } from "../controllers/users/authenticate-user.controller";
import { registerUserController } from "../controllers/users/register-user.controller";
import { updateUserController } from "../controllers/users/update-user.controller";
import { deleteUserController } from "../controllers/users/delete-user.controller";
import { refreshTokenController } from "../controllers/users/refresh-token.controller";
import { verifyJWT } from "../middleware/verify-jwt";

export const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/session",
    {
      schema: {
        description: "Authentication with JWT",
        tags: ["Authentication"],
        summary: "Authentication with JWT",
        body: {
          type: "object",
          properties: {
            email: { type: "string", default: "johndoe@gmail.com" },
            password: { type: "string", default: "12345678" },
          },
          required: ["email", "password"],
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
          },
        },
      },
    },
    authenticateUserController,
  );

  fastify.patch(
    "/refresh-token",
    {
      schema: {
        description: "Refresh access token",
        tags: ["Authentication"],
        summary: "Refresh access token",
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
          },
        },
      },
    },
    refreshTokenController,
  );

  fastify.post(
    "/users",
    {
      schema: {
        description: "Register user",
        tags: ["User"],
        summary: "Register user",
        body: {
          type: "object",
          properties: {
            name: { type: "string", default: "John Doe" },
            email: { type: "string", default: "johndoe@gmail.com" },
            password: { type: "string", default: "12345678" },
          },
          required: ["name", "email", "password"],
        },
      },
    },
    registerUserController,
  );

  fastify.put(
    "/users",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Update user",
        tags: ["User"],
        summary: "Update user",
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        response: {
          204: {
            description: "Successful response",
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              updated_at: { type: "string" },
            },
          },
        },
      },
      preHandler: [verifyJWT],
    },
    updateUserController,
  );

  fastify.delete(
    "/users",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Delete user",
        tags: ["User"],
        summary: "Delete user",
      },
      preHandler: [verifyJWT],
    },
    deleteUserController,
  );
};
