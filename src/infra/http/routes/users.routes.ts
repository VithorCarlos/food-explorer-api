import { FastifyInstance } from "fastify";
import { authenticate } from "../controllers/users/authenticate";
import { registerUser } from "../controllers/users/register";
import { updateUser } from "../controllers/users/update";
import { deleteUser } from "../controllers/users/delete";
import { refreshToken } from "../controllers/users/refresh";
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
    authenticate,
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
            },
          },
        },
      },
    },
    refreshToken,
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
    registerUser,
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
    updateUser,
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
    deleteUser,
  );
};
