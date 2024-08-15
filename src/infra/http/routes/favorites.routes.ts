import { FastifyInstance } from "fastify";
import { createFavorite } from "../controllers/favorites/create";
import { verifyJWT } from "../middleware/verify-jwt";
import { deleteFavorite } from "../controllers/favorites/delete";
import { findManyFavorites } from "../controllers/favorites/find-many";

export const favoritesRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Create favorites",
        tags: ["Favorites"],
        summary: "Create favorites",
        body: {
          type: "object",
          properties: {
            snackId: { type: "string" },
          },
          required: ["snackId"],
        },
      },
      onRequest: [verifyJWT],
    },
    createFavorite
  );

  fastify.get(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Find many favorites",
        tags: ["Favorites"],
        summary: "Find many favorites",
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", default: 1 },
            perPage: { type: "integer", default: 10 },
          },
        },
      },
      onRequest: [verifyJWT],
    },
    findManyFavorites
  );

  fastify.delete(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Delete favorite",
        body: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
        tags: ["Favorites"],
        summary: "Delete favorite",
      },
      onRequest: [verifyJWT],
    },
    deleteFavorite
  );
};
