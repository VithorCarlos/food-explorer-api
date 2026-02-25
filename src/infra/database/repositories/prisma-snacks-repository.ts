import { Snack } from "@/domain/entities/snack";
import {
  SearchManySnacksParams,
  SnacksRepository,
} from "@/domain/repositories/snacks-repository";
import { PrismaSnackAdapter } from "../adapters/prisma-snack-adapter";
import { PrismaService } from "../prisma";
import { PrismaAttachmentLinkAdapter } from "../adapters/prisma-attachment-link-adater";
import { PrismaSnackWithAttachmentsAdapter } from "../adapters/prisma-snack-with-attachments-adapter";
import {
  ATTACHMENT_STATUS,
  Prisma,
  RESOURSE_TYPE,
} from "generated/prisma/client";
import { Uploader } from "@/domain/storage/uploader";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { PaginatedResponse } from "@/shared/paginated-response";
import { SnackWithAttachment } from "@/domain/entities/value-objects/snack-with-attachment";

export class PrismaSnacksRepository implements SnacksRepository {
  constructor(
    private prisma: PrismaService,
    private uploader: Uploader,
  ) {}

  async findById(id: string) {
    const snack = await this.prisma.snack.findFirst({
      where: { id },
    });

    if (!snack) {
      return null;
    }

    return PrismaSnackAdapter.toDomain(snack);
  }

  async findByIdWithAttachment(id: string) {
    const snacks = await this.prisma.$queryRaw<
      {
        snack_id: string;
        title: string;
        description: string;
        category: string;
        ingredients: string[];
        price: number;
        user_id: string;
        created_at: Date;
        updated_at: Date;
        attachment_url: string | null;
        attachment_id: string;
      }[]
    >(
      Prisma.sql`
      SELECT 
        s.id as snack_id,
        s.title,
        s.description,
        s.category,
        s.ingredients,
        s.price,
        s.user_id,
        s.created_at,
        s.updated_at,
        al.attachment_id,
        a.url as attachment_url
      FROM snacks s
      LEFT JOIN attachment_link al 
        ON al.resource_id = s.id
        AND al.resource_type = 'SNACK'
      LEFT JOIN attachment a
        ON a.id = al.attachment_id
      WHERE s.id = ${id}
      `,
    );

    if (snacks.length === 0) {
      return null;
    }

    return PrismaSnackWithAttachmentsAdapter.toDomain(snacks[0]);
  }

  async searchMany({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManySnacksParams): Promise<PaginatedResponse<Snack>> {
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
    const where = {
      category,
      ...(searchConditions.length > 0 && {
        OR: searchConditions,
      }),
    };
    const [snacks, total] = await Promise.all([
      this.prisma.snack.findMany({
        where,
        skip: (page - 1) * perPage,
        orderBy: {
          title: "desc",
        },
        take: perPage,
      }),
      this.prisma.snack.count({ where }),
    ]);

    const hasMore = page * perPage < total;

    return {
      data: snacks.map(PrismaSnackAdapter.toDomain),
      pagination: { total, hasMore, nextPage: hasMore ? page + 1 : null },
    };
  }

  async findActiveCategories(): Promise<FOOD_CATEGORIES[]> {
    const activeCategories = await this.prisma.snack.groupBy({
      by: ["category"],
    });

    return activeCategories.map((c) => c.category as FOOD_CATEGORIES);
  }

  async searchManyWithAttachments({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManySnacksParams): Promise<PaginatedResponse<SnackWithAttachment>> {
    const andConditions: Prisma.Sql[] = [];

    if (category) {
      andConditions.push(
        Prisma.sql`LOWER(s.category) = ${category.toLowerCase()}`,
      );
    }

    const searchConditions: Prisma.Sql[] = [];

    if (title) {
      const cleanTitle = `%${title.trim().toLowerCase()}%`;
      searchConditions.push(Prisma.sql`LOWER(s.title) LIKE ${cleanTitle}`);
    }

    if (ingredients && ingredients.length > 0) {
      const ingredientsSql = ingredients.map((ing) => {
        const cleanIng = `%${ing.trim().toLowerCase()}%`;

        return Prisma.sql`LOWER(array_to_string(s.ingredients, ',')) LIKE ${cleanIng}`;
      });

      searchConditions.push(
        Prisma.sql`(${Prisma.join(ingredientsSql, " OR ")})`,
      );
    }

    if (searchConditions.length > 0) {
      andConditions.push(
        Prisma.sql`(${Prisma.join(searchConditions, " OR ")})`,
      );
    }

    const whereClause =
      andConditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(andConditions, " AND ")}`
        : Prisma.sql``;

    const [snacksWithAttachment, totalResult] = await Promise.all([
      this.prisma.$queryRaw<
        {
          snack_id: string;
          title: string;
          description: string;
          category: string;
          ingredients: string[];
          price: number;
          user_id: string;
          created_at: Date;
          updated_at: Date;
          attachment_url: string | null;
          attachment_id: string;
        }[]
      >(Prisma.sql`
      SELECT 
        s.id as snack_id,
        s.title,
        s.description,
        s.category,
        s.ingredients,
        s.price,
        s.user_id,
        s.created_at,
        s.updated_at,
        al.attachment_id,
        a.url as attachment_url
      FROM snacks s
      LEFT JOIN attachment_link al 
        ON al.resource_id = s.id
        AND al.resource_type = 'SNACK'
      LEFT JOIN attachment a
        ON a.id = al.attachment_id
      ${whereClause}
      ORDER BY s.title DESC
      LIMIT ${perPage}
      OFFSET ${(page - 1) * perPage}
      `),

      //get total count
      this.prisma.$queryRaw<{ total: bigint }[]>(Prisma.sql`
        SELECT COUNT(*) as total
        FROM snacks s
        ${whereClause}
      `),
    ]);

    const hasMore = page * perPage < (totalResult[0].total ?? 0);

    return {
      data: snacksWithAttachment.map(
        PrismaSnackWithAttachmentsAdapter.toDomain,
      ),
      pagination: {
        total: Number(totalResult[0].total) ?? 0,
        hasMore,
        nextPage: hasMore ? page + 1 : null,
      },
    };
  }

  async create(data: Snack) {
    const snack = PrismaSnackAdapter.toPrisma(data);

    await this.prisma.$transaction(async (tx) => {
      await tx.snack.create({
        data: snack,
      });

      if (data.attachmentLink) {
        const attachmentLink = PrismaAttachmentLinkAdapter.toPrisma(
          data.attachmentLink,
        );

        await tx.attachmentLink.create({
          data: attachmentLink,
        });

        await tx.attachment.update({
          where: {
            id: attachmentLink.attachmentId,
          },
          data: { expiresAt: null, status: ATTACHMENT_STATUS.LINKED },
        });
      }
    });
  }

  async update(data: Snack) {
    const snack = PrismaSnackAdapter.toPrisma(data);
    const snackId = data.id.toString();
    const userId = data.userId.toString();
    const newAttachmentId = data.attachmentLink.attachmentId.toString();

    const existingLink = await this.prisma.attachmentLink.findFirst({
      where: {
        resourceId: snackId,
        resourceType: RESOURSE_TYPE.SNACK,
      },
      include: { attachment: true },
    });

    const oldAttachmentId = existingLink?.attachmentId;
    const oldAttachmentUrl = existingLink?.attachment?.url;
    const isNewAttachment = oldAttachmentId !== newAttachmentId;

    await this.prisma.$transaction(async (tx) => {
      await tx.snack.update({
        where: { id: snackId, userId: userId },
        data: {
          title: snack.title,
          category: snack.category,
          ingredients: snack.ingredients,
          price: snack.price,
          description: snack.description,
          updatedAt: snack.updatedAt,
        },
      });

      if (isNewAttachment) {
        await tx.attachmentLink.deleteMany({
          where: {
            resourceId: snackId,
            resourceType: RESOURSE_TYPE.SNACK,
          },
        });

        if (oldAttachmentId) {
          await tx.attachment.delete({
            where: { id: oldAttachmentId },
          });
        }

        const newAttachmentLink = PrismaAttachmentLinkAdapter.toPrisma(
          data.attachmentLink,
        );
        await tx.attachmentLink.create({
          data: newAttachmentLink,
        });

        await tx.attachment.update({
          where: { id: newAttachmentId },
          data: {
            expiresAt: null,
            status: ATTACHMENT_STATUS.LINKED,
          },
        });
      }
    });

    if (isNewAttachment && oldAttachmentUrl) {
      await this.uploader.delete({ key: oldAttachmentUrl });
    }
  }

  async delete(id: string) {
    const attachmentLink = await this.prisma.attachmentLink.findFirst({
      where: {
        resourceId: id,
        resourceType: RESOURSE_TYPE.SNACK,
      },
      include: {
        attachment: true,
      },
    });

    if (attachmentLink) {
      await Promise.all([
        this.prisma.attachment.delete({
          where: { id: attachmentLink.attachmentId },
        }),
        this.uploader.delete({ key: attachmentLink.attachment.url }),
      ]);
    }

    await this.prisma.snack.delete({
      where: {
        id,
      },
    });
  }
}
