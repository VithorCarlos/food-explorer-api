import { z } from "zod";
import { makeCreateProductUseCase } from "../../factories/make-create-product-use-case";
import { PrismaProductAdapter } from "@/infra/database/adapters/prisma-product-adapter";
import { FastifyReply, FastifyRequest } from "fastify";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";

export const createProductController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.enum(PRODUCT_CATEGORIES),
    ingredients: z.string().array().optional(),
    price: z.number().min(0),
    attachmentId: z.string().optional(),
  });

  const { title, category, ingredients, price, description, attachmentId } =
    createSchema.parse(request.body);

  const userId = request.user.sub;

  const createProductUseCase = makeCreateProductUseCase(request.server.prisma);

  const { product: createdProduct } = await createProductUseCase.execute({
    title,
    category,
    ...(ingredients && { ingredients }),
    ...(description && { description }),
    ...(attachmentId && { attachmentId }),
    userId,
    price,
  });

  const product = PrismaProductAdapter.toPrisma(createdProduct);

  return reply.status(201).send({ product: { ...product, attachmentId } });
};
