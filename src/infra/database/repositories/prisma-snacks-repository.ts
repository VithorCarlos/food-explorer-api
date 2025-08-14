import { Snack } from "@/domain/entities/snack";
import {
  SearchManySnacksParams,
  SnacksRepository,
} from "@/domain/repositories/snacks-repository";
import { PrismaSnackAdapter } from "../adapters/prisma-snack-adapter";
import { prisma } from "../prisma";

export class PrismaSnacksRepository implements SnacksRepository {
  async findById(id: string) {
    const snack = await prisma.snacks.findFirst({
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

    const snacks = await prisma.snacks.findMany({
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
    await prisma.snacks.create({
      data: snack,
    });

    if (snack.attachment) {
      await prisma.attachment.update({
        where: { id: snack.attachment?.attachmentId },
        data: {
          expires_at: null,
        },
      });
    }
  }

  async update(data: Snack) {
    const snack = PrismaSnackAdapter.toPrisma(data);

    await prisma.snacks.update({
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
        updated_at: snack.updated_at,
      },
    });

    if (data.attachment && data.attachment.attachmentId) {
      const resourceId = data.attachment.resourceId;

      await prisma.attachment_link.deleteMany({
        where: {
          resourceId,
          resourceType: "SNACK",
        },
      });
    }
  }

  async delete(id: string) {
    const attachment = await prisma.attachment_link.findFirst({
      where: {
        resourceId: id,
        resourceType: "SNACK",
      },
      select: {
        attachmentId: true,
      },
    });

    if (attachment) {
      await prisma.attachment.delete({
        where: { id: attachment.attachmentId },
      });
    }

    await prisma.snacks.delete({
      where: {
        id,
      },
    });
  }
}
