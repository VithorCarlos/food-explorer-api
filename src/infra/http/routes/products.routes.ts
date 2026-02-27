import { FastifyInstance } from "fastify";
import { verifyRole } from "../middleware/verify-role";
import { ROLE } from "@/domain/enums/role";
import { verifyJWT } from "../middleware/verify-jwt";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { searchProductController } from "../controllers/products/search-product.controller";
import { findActiceCategoriesController } from "../controllers/products/find-active-product-categories.controller";
import { findOneProductController } from "../controllers/products/find-one-product.controller";
import { createProductController } from "../controllers/products/create-product.controller";
import { updateProductController } from "../controllers/products/update-product.controller";
import { deleteProductController } from "../controllers/products/delete-product.controller";

export const productsRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "",
    {
      schema: {
        description: "Search products",
        tags: ["Products"],
        summary: "Search products",
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
    searchProductController,
  );

  fastify.get(
    "/active-categories",
    {
      schema: {
        description: "Find Active Categories",
        tags: ["Products"],
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
        description: "Find one product",
        tags: ["Products"],
        summary: "Find one product",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
      preHandler: [verifyJWT],
    },
    findOneProductController,
  );

  fastify.post(
    "",
    {
      schema: {
        description: "Create product",
        tags: ["Products"],
        summary: "Create product",
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            attachmentId: { type: "string" },
            category: {
              type: "string",
              enum: Object.values(PRODUCT_CATEGORIES),
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
    createProductController,
  );

  fastify.put(
    "/:id",
    {
      schema: {
        description: "Update product",
        tags: ["Products"],
        summary: "Update product",
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
    updateProductController,
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        description: "Delete product",
        tags: ["Products"],
        summary: "Delete product",
      },
      preHandler: [verifyJWT, verifyRole(ROLE.ADMIN)],
    },
    deleteProductController,
  );
};
