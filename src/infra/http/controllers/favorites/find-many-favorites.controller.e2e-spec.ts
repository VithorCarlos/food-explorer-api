import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { UserFactory } from "test/factories/make-user";
import { TOKEN } from "@/domain/enums/token";
import { FavoriteFactory, makeFavorite } from "test/factories/make-favorite";
import { makeProduct, ProductFactory } from "test/factories/make-product";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { AttachmentFactory } from "test/factories/make-attachment";
import { Product } from "@/domain/entities/product";
import { Favorite } from "@/domain/entities/favorite";
import { PrismaProductAdapter } from "@/infra/database/adapters/prisma-product-adapter";
import { PrismaFavoriteAdapter } from "@/infra/database/adapters/prisma-favorite-adapter";

describe("Find many favorites (e2e)", () => {
  let app: FastifyInstance;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let favoriteFactory: FavoriteFactory;
  let productFactory: ProductFactory;
  let attachmentFactory: AttachmentFactory;

  beforeAll(async () => {
    prisma = new PrismaService();
    app = await buildApp();
    await app.ready();
    userFactory = new UserFactory(prisma);
    favoriteFactory = new FavoriteFactory(prisma);
    productFactory = new ProductFactory(prisma);
    attachmentFactory = new AttachmentFactory(prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  test.skip("[GET] /favorite", async () => {
    const user = await userFactory.makeUserToPrisma();

    let products: Product[] = [];
    let favorites: Favorite[] = [];

    for (let i = 0; i < 12; i++) {
      products.push(
        makeProduct({
          id: new UniqueEntityId(`product-${i}`),
          userId: user.id,
        }),
      );

      favorites.push(
        makeFavorite({
          userId: user.id,
          productId: new UniqueEntityId(`product-${i}`),
        }),
      );
    }
    const rawProducts = products.map(PrismaProductAdapter.toPrisma);
    const rawFavorites = favorites.map(PrismaFavoriteAdapter.toPrisma);

    await prisma.product.createMany({ data: rawProducts });
    await prisma.favorite.createMany({ data: rawFavorites });

    const accessToken = app.jwt.sign({
      sub: user.id.toString(),
      role: user.role,
    });

    const response = await request(app.server)
      .get("/favorite")
      .query({ page: "1", perPage: "10" })
      .set("Cookie", [`${TOKEN.ACCESS_TOKEN}=${accessToken}`]);

    expect(response.statusCode).toEqual(200);
  });
});
