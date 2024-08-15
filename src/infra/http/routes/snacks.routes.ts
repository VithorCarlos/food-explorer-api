import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middleware/verify-jwt";
import { createSnack } from "../controllers/snacks/create";
import { verifyRole } from "../middleware/verify-role";
import { ROLE } from "@/domain/enums/role";
import { updateSnack } from "../controllers/snacks/update";
import { deleteSnack } from "../controllers/snacks/delete";
import { searchSnack } from "../controllers/snacks/search";

export const snackRoutes = async (fastify: FastifyInstance) => {
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
            category: { type: "string", default: "snacks" },
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
              title: { type: "string" },
              category: { type: "string" },
              ingredients: { type: "array" },
              price: { type: "integer" },
              description: { type: "string" },
              imageUrl: { type: "string" },
            },
          },
        },
      },
      onRequest: [verifyJWT, verifyRole(ROLE.ADMIN)],
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
            ingredients: { type: "array" },
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
              ingredients: { type: "array" },
              price: { type: "integer" },
              description: { type: "string" },
              imageUrl: { type: "string" },
            },
          },
        },
      },
      onRequest: [verifyJWT, verifyRole(ROLE.ADMIN)],
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
        response: {
          200: {
            description: "Successful response",
            type: "array",
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              category: { type: "string" },
              ingredients: { type: "array" },
              price: { type: "integer" },
              description: { type: "string" },
              imageUrl: { type: "string" },
            },
          },
        },
      },
      onRequest: [verifyJWT, verifyRole(ROLE.ADMIN)],
    },
    deleteSnack
  );

  fastify.get(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Search snack",
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", default: 1 },
            perPage: { type: "integer", default: 10 },
            title: { type: "string" },
            ingredients: { type: "array" },
          },
        },

        tags: ["Snacks"],
        summary: "Search snack",
      },
      onRequest: [verifyJWT],
    },
    searchSnack
  );
};
