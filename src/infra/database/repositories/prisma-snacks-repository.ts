import { Snack } from "@/domain/entities/snack";
import {
  SearchManySnacksParams,
  SnacksRepository,
} from "@/domain/repositories/snacks-repository";
import { PrismaSnackAdapter } from "../adapters/prisma-snack-adapter";
import { PrismaService } from "../prisma";

export class PrismaSnacksRepository implements SnacksRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const snack = await this.prisma.snack.findFirst({
      where: { id },
    });

    if (!snack) {
      return null;
    }

    return PrismaSnackAdapter.toDomain(snack);
  }

  async searchMany({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManySnacksParams) {
    const searchConditions = [];

    if (title) {
      searchConditions.push({
        title: {
          contains: title,
        },
      });
    }

    if (ingredients) {
      searchConditions.push({
        ingredients: {
          hasSome: ingredients,
        },
      });
    }

    const snacks = await this.prisma.snack.findMany({
      where: {
        category,
        ...(searchConditions.length > 0 && {
          OR: searchConditions,
        }),
      },
      skip: (page - 1) * perPage,
      include: { _count: true },
      orderBy: {
        title: "desc",
      },
      take: perPage,
    });

    return snacks.map(PrismaSnackAdapter.toDomain);
  }

  async create(data: Snack) {
    const snack = PrismaSnackAdapter.toPrisma(data);
    await this.prisma.snack.create({
      data: snack,
    });

    if (snack.attachment) {
      await this.prisma.attachment.update({
        where: { id: snack.attachment?.attachmentId },
        data: {
          expiresAt: null,
        },
      });
    }
  }

  async update(data: Snack) {
    const snack = PrismaSnackAdapter.toPrisma(data);

    await this.prisma.snack.update({
      where: {
        id: data.id,
        userId: data.userId,
      },
      data: {
        title: snack.title,
        category: snack.category,
        ingredients: snack.ingredients,
        price: snack.price,
        description: snack.description,
        updatedAt: snack.updated_at,
      },
    });

    if (data.attachment && data.attachment.attachmentId) {
      const resourceId = data.attachment.resourceId;

      await this.prisma.attachmentLink.deleteMany({
        where: {
          resourceId,
          resourceType: "SNACK",
        },
      });
    }
  }

  async delete(id: string) {
    const attachment = await this.prisma.attachmentLink.findFirst({
      where: {
        resourceId: id,
        resourceType: "SNACK",
      },
      select: {
        attachmentId: true,
      },
    });

    if (attachment) {
      await this.prisma.attachment.delete({
        where: { id: attachment.attachmentId },
      });
    }

    await this.prisma.snack.delete({
      where: {
        id,
      },
    });
  }
}
