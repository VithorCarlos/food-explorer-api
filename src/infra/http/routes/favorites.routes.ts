import { FastifyInstance } from "fastify";
import { createFavorite } from "../controllers/favorites/create";
import { deleteFavorite } from "../controllers/favorites/delete";
import { findManyFavorites } from "../controllers/favorites/find-many";
import { verifyJWT } from "../middleware/verify-jwt";

export const favoritesRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "",
    {
      schema: {
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
      preHandler: [verifyJWT],
    },
    createFavorite,
  );

  fastify.get(
    "",
    {
      schema: {
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
      preHandler: [verifyJWT],
    },
    findManyFavorites,
  );

  fastify.delete(
    "",
    {
      schema: {
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
      preHandler: [verifyJWT],
    },
    deleteFavorite,
  );
};
