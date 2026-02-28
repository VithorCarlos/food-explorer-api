import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { UserFactory } from "test/factories/make-user";
import { TOKEN } from "@/domain/enums/token";
import { FavoriteFactory } from "test/factories/make-favorite";
import { ProductFactory } from "test/factories/make-product";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

describe("Delete favorites (e2e)", () => {
  let app: FastifyInstance;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let favoriteFactory: FavoriteFactory;
  let productFactory: ProductFactory;

  beforeAll(async () => {
    app = await buildApp();
    prisma = new PrismaService();
    userFactory = new UserFactory(prisma);
    favoriteFactory = new FavoriteFactory(prisma);
    productFactory = new ProductFactory(prisma);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("[DELETE] /favorite", async () => {
    const user = await userFactory.makeUserToPrisma();

    const product1 = await productFactory.makeProductToPrisma({
      userId: user.id,
      attachmentId: new UniqueEntityId("attachment-01"),
    });

    const product2 = await productFactory.makeProductToPrisma({
      userId: user.id,
      attachmentId: new UniqueEntityId("attachment-02"),
    });

    await favoriteFactory.makeFavoriteToPrisma({
      productId: product1.id,
      userId: user.id,
    });

    await favoriteFactory.makeFavoriteToPrisma({
      productId: product2.id,
      userId: user.id,
    });

    const accessToken = app.jwt.sign({
      sub: user.id.toString(),
      role: user.role,
    });

    const response = await request(app.server)
      .delete("/favorite")
      .set("Cookie", [`${TOKEN.ACCESS_TOKEN}=${accessToken}`])
      .send({ productId: product1.id.toString() });

    const favoritesOnDatabase = await prisma.favorite.findMany({
      where: { userId: user.id.toString() },
    });

    expect(response.statusCode).toEqual(204);
    expect(favoritesOnDatabase).toHaveLength(1);
  });
});
