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

    const snackId = data.id.toString();
    const userId = data.userId.toString();

    const existingAttachmentLink = await this.prisma.attachmentLink.findFirst({
      where: {
        resourceId: snackId,
        resourceType: RESOURSE_TYPE.SNACK,
      },
      include: {
        attachment: true,
      },
    });

    let oldAttachmentUrl: string | null = null;

    if (existingAttachmentLink?.attachment?.url) {
      oldAttachmentUrl = existingAttachmentLink.attachment.url;
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.snack.update({
        where: {
          id: snackId,
          userId: userId,
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

      if (data.attachmentLink) {
        const attachmentLink = PrismaAttachmentLinkAdapter.toPrisma(
          data.attachmentLink,
        );

        await tx.attachmentLink.deleteMany({
          where: {
            resourceId: snackId,
            resourceType: RESOURSE_TYPE.SNACK,
          },
        });

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

    if (oldAttachmentUrl && data.attachmentLink) {
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
