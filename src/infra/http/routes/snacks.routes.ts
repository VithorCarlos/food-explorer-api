import { FastifyInstance } from "fastify";
import { createSnackController } from "../controllers/snacks/create-snack.controller";
import { verifyRole } from "../middleware/verify-role";
import { ROLE } from "@/domain/enums/role";
import { updateSnackController } from "../controllers/snacks/update-snack.controller";
import { deleteSnackController } from "../controllers/snacks/delete-snack.controller";
import { searchSnackController } from "../controllers/snacks/search-snack.controller";
import { verifyJWT } from "../middleware/verify-jwt";
import { findOneSnackController } from "../controllers/snacks/find-one-snack.controller";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { findActiceCategoriesController } from "../controllers/snacks/find-active-categories.controller";

export const snackRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "",
    {
      schema: {
        description: "Search snacks",
        tags: ["Snacks"],
        summary: "Search snacks",
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", default: 1 },
            perPage: { type: "integer", default: 10 },
            title: { type: "string" },
            category: { type: "string" },
            ingredients: { type: "array" },
          },
        },
      },
      preHandler: [verifyJWT],
    },
    searchSnackController,
  );

  fastify.get(
    "/active-categories",
    {
      schema: {
        description: "Find Active Categories",
        tags: ["Snacks"],
        summary: "Find Active Categories",
      },
      preHandler: [verifyJWT],
    },
    findActiceCategoriesController,
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Find one snack",
        tags: ["Snacks"],
        summary: "Find one snack",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
      preHandler: [verifyJWT],
    },
    findOneSnackController,
  );

  fastify.post(
    "",
    {
      schema: {
        description: "Create snack",
        tags: ["Snacks"],
        summary: "Create snack",
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            attachmentId: { type: "string" },
            category: {
              type: "string",
              enum: Object.values(FOOD_CATEGORIES),
            },
            ingredients: {
              type: "array",
            },
            price: { type: "number" },
            description: {
              type: "string",
            },
          },
          required: ["title", "category", "price"],
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              category: { type: "string" },
              ingredients: { type: "array", default: [] },
              price: { type: "number" },
              description: { type: "string" },
              attachmentId: { type: "string" },
            },
          },
        },
      },
      preHandler: [verifyJWT, verifyRole(ROLE.ADMIN)],
    },
    createSnackController,
  );

  fastify.put(
    "/:id",
    {
      schema: {
        description: "Update snack",
        tags: ["Snacks"],
        summary: "Update snack",
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            attachmentId: { type: "string" },
            category: { type: "string" },
            ingredients: {
              type: "array",
              default: [],
            },
            price: { type: "integer" },
            description: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              category: { type: "string" },
              ingredients: { type: "array", default: [] },
              price: { type: "integer" },
              description: { type: "string" },
              attachmentId: { type: "string" },
            },
          },
        },
      },
      preHandler: [verifyJWT, verifyRole(ROLE.ADMIN)],
    },
    updateSnackController,
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        description: "Delete snack",
        tags: ["Snacks"],
        summary: "Delete snack",
      },
      preHandler: [verifyJWT, verifyRole(ROLE.ADMIN)],
    },
    deleteSnackController,
  );
};
