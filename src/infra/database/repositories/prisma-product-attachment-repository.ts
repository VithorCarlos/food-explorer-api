import { ProductAttachment } from "@/domain/entities/product-attachment";
import { PrismaService } from "../prisma";
import {
  ProductAttachmentDetails,
  ProductAttachmentRepository,
} from "@/domain/repositories/product-attachment-repository";
import { PrismaProductAttachmentAdapter } from "../adapters/prisma-product-attachment-adater";

export class PrismaProductAttachmentRepository implements ProductAttachmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(productAttachment: ProductAttachment): Promise<void> {
    const productAttachmentAdapter =
      PrismaProductAttachmentAdapter.toPrisma(productAttachment);

    await this.prisma.productAttachment.create({
      data: productAttachmentAdapter,
    });
  }

  async findByProductId(
    productId: string,
  ): Promise<ProductAttachmentDetails | null> {
    const productAttachment = await this.prisma.productAttachment.findFirst({
      where: { productId },
      include: {
        attachment: true,
      },
    });

    if (!productAttachment) {
      return null;
    }

    return PrismaProductAttachmentAdapter.bind(productAttachment);
  }

  async deleteByProductId(productId: string): Promise<void> {
    await this.prisma.productAttachment.deleteMany({ where: { productId } });
  }

  async delete(productAttachment: ProductAttachment): Promise<void> {
    await this.prisma.productAttachment.delete({
      where: { id: productAttachment.id.toString() },
    });
  }
}
