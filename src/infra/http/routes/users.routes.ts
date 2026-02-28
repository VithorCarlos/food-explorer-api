import { FastifyInstance } from "fastify";
import { authenticateUserController } from "../controllers/users/authenticate-user.controller";
import { registerUserController } from "../controllers/users/register-user.controller";
import { updateUserController } from "../controllers/users/update-user.controller";
import { deleteUserController } from "../controllers/users/delete-user.controller";
import { refreshTokenController } from "../controllers/users/refresh-token.controller";
import { verifyJWT } from "../middleware/verify-jwt";
import { findUserByIdController } from "../controllers/users/find-users-by-id.controller";

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
            password: { type: "string", default: "123456" },
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
            password: { type: "string", default: "123456" },
          },
          required: ["name", "email", "password"],
        },
        response: {
          201: {
            description: "Successful response",
          },
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
          },
        },
      },
      preHandler: [verifyJWT],
    },
    updateUserController,
  );

  fastify.get(
    "/users",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Find User",
        tags: ["User"],
        summary: "Find User",
      },
      preHandler: [verifyJWT],
    },
    findUserByIdController,
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
