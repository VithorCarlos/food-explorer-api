import { FastifyInstance } from "fastify";
import { createSnack } from "../controllers/snacks/create";
import { verifyRole } from "../middleware/verify-role";
import { ROLE } from "@/domain/enums/role";
import { updateSnack } from "../controllers/snacks/update";
import { deleteSnack } from "../controllers/snacks/delete";
import { searchSnack } from "../controllers/snacks/search";
import { verifyJWT } from "../middleware/verify-jwt";
import { findOneSnack } from "../controllers/snacks/find-one";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";

export const snackRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
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
    searchSnack
  );

  fastify.get(
    "/:id",
    {
      schema: {
        security: [{ BearerAuth: [] }],
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
    findOneSnack
  );

  fastify.post(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Create snack",
        tags: ["Snacks"],
        summary: "Create snack",
        body: {
          type: "object",
          properties: {
            title: { type: "string", default: "Mozzarella pizza" },
            category: {
              type: "string",
              enum: Object.values(FOOD_CATEGORIES),
              default: FOOD_CATEGORIES.MEATS,
            },
            ingredients: {
              type: "array",
              default: ["cheese", "tomato", "onion"],
            },
            price: { type: "integer", default: 54 },
            description: {
              type: "string",
              default: "A delicious pizza with melted cheese",
            },
            imageUrl: {
              type: "string",
              default: "https://image-url.com.br/pizza.png",
            },
          },
          required: ["title", "category", "price", "description", "imageUrl"],
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
              imageUrl: { type: "string" },
            },
          },
        },
      },
      preHandler: [verifyJWT, verifyRole(ROLE.ADMIN)],
    },
    createSnack
  );

  fastify.put(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Update snack",
        tags: ["Snacks"],
        summary: "Update snack",
        body: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            category: { type: "string" },
            ingredients: {
              type: "array",
              default: [],
            },
            price: { type: "integer" },
            description: { type: "string" },
            imageUrl: { type: "string" },
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
              imageUrl: { type: "string" },
            },
          },
        },
      },
      preHandler: [verifyJWT, verifyRole(ROLE.ADMIN)],
    },
    updateSnack
  );

  fastify.delete(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Delete snack",
        body: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
        tags: ["Snacks"],
        summary: "Delete snack",
      },
      preHandler: [verifyJWT, verifyRole(ROLE.ADMIN)],
    },
    deleteSnack
  );
};
