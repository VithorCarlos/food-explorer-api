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

  async searchManyWithAttachments({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManySnacksParams) {
    const conditions: Prisma.Sql[] = [];

    if (category) {
      conditions.push(
        Prisma.sql`LOWER(s.category) = ${category.toLowerCase()}`,
      );
    }

    if (title) {
      const cleanTitle = `%${title.trim().toLowerCase()}%`;
      conditions.push(Prisma.sql`LOWER(s.title) LIKE ${cleanTitle}`);
    }

    if (ingredients && ingredients.length > 0) {
      conditions.push(Prisma.sql`s.ingredients && ${ingredients}`);
    }

    const whereClause =
      conditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
        : Prisma.sql``;

    const snacksWithAttachment = await this.prisma.$queryRaw<
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
      `);
    return snacksWithAttachment.map(PrismaSnackWithAttachmentsAdapter.toDomain);
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

    await this.prisma.$transaction(async (tx) => {
      await tx.snack.update({
        where: {
          id: data.id.toString(),
          userId: data.userId.toString(),
        },
        data: {
          title: snack.title,
          category: snack.category,
          ingredients: snack.ingredients,
          price: snack.price,
          description: snack.description,
          updatedAt: snack.updatedAt,
        },
      });

      await tx.attachmentLink.deleteMany({
        where: {
          resourceId: data.id.toString(),
          resourceType: RESOURSE_TYPE.SNACK,
        },
      });

      if (data.attachmentLink) {
        const attachmentLink = PrismaAttachmentLinkAdapter.toPrisma(
          data.attachmentLink,
        );

        await tx.attachmentLink.create({
          data: attachmentLink,
        });

        await tx.attachment.update({
          where: { id: attachmentLink.attachmentId },
          data: {
            expiresAt: null,
            status: ATTACHMENT_STATUS.LINKED,
          },
        });
      }
    });
  }
  async delete(id: string) {
    const attachment = await this.prisma.attachmentLink.findFirst({
      where: {
        resourceId: id,
        resourceType: RESOURSE_TYPE.SNACK,
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
