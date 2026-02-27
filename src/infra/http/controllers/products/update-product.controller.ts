import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateProductUseCase } from "../../factories/make-update-product-use-case";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { PrismaProductAdapter } from "@/infra/database/adapters/prisma-product-adapter";

export const updateProductController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const updateSchemaBody = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(PRODUCT_CATEGORIES).optional(),
    ingredients: z.string().array().optional(),
    price: z.number().optional(),
    attachmentId: z.string().optional(),
  });

  const updateSchemaParms = z.object({
    id: z.string(),
  });

  const { title, category, ingredients, price, description, attachmentId } =
    updateSchemaBody.parse(request.body);

  const { id } = updateSchemaParms.parse(request.params);

  const userId = request.user.sub;

  try {
    const updateProductUseCase = makeUpdateProductUseCase(
      request.server.prisma,
    );

    const { product: updatedProduct } = await updateProductUseCase.execute({
      productId: id,
      ...(attachmentId && { attachmentId }),
      ...(description && { description }),
      ...(ingredients?.length && { ingredients }),
      title,
      category,
      userId,
      price,
    });

    const product = PrismaProductAdapter.toPrisma(updatedProduct);

    reply.status(201).send({ product });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
