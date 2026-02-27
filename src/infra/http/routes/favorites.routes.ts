import { FastifyInstance } from "fastify";
import { createFavoriteController } from "../controllers/favorites/create-favorite.controller";
import { deleteFavoriteController } from "../controllers/favorites/delete-favorite.controller";
import { findManyFavoritesController } from "../controllers/favorites/find-many-favorites.controller";
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
            productId: { type: "string" },
          },
          required: ["productId"],
        },
      },
      preHandler: [verifyJWT],
    },
    createFavoriteController,
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
    findManyFavoritesController,
  );

  fastify.delete(
    "",
    {
      schema: {
        description: "Delete favorite",
        body: {
          type: "object",
          properties: {
            productId: { type: "string" },
          },
        },
        tags: ["Favorites"],
        summary: "Delete favorite",
      },
      preHandler: [verifyJWT],
    },
    deleteFavoriteController,
  );
};
