import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { AttachmentFactory } from "test/factories/make-attachment";
import { UserFactory } from "test/factories/make-user";
import { makeProduct } from "test/factories/make-product";
import { ROLE } from "@/domain/enums/role";

describe("Create Product(e2e)", () => {
  let app: FastifyInstance;
  let prisma: PrismaService;
  let attachmentFactory: AttachmentFactory;
  let userFactory: UserFactory;

  beforeAll(async () => {
    app = await buildApp();
    prisma = new PrismaService();
    attachmentFactory = new AttachmentFactory(prisma);
    userFactory = new UserFactory(prisma);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create an product", async () => {
    const email = "johndoe@gmail.com";
    const password = "12345";

    const user = await userFactory.makeUserToPrisma({
      email,
      password,
      role: ROLE.ADMIN,
    });

    const attachment = await attachmentFactory.makeAttachmentToPrisma();

    const product = makeProduct({ title: "product-01" });

    const accessToken = app.jwt.sign(
      { role: user.role },
      { sub: user.id.toString() },
    );

    const response = await request(app.server)
      .post(`/product`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: product.title,
        description: product.description,
        category: product.category,
        ingredients: product.ingredients,
        price: product.price,
        userId: user.id.toString(),
        attachmentId: attachment.id.toString(),
      });

    const productResponse = response.body.product;

    const productAttachmentOnDatabase = await prisma.productAttachment.findMany(
      {
        where: {
          productId: productResponse.id.toString(),
        },
      },
    );

    expect(productResponse.id.toString()).toEqual(expect.any(String));
    expect(productAttachmentOnDatabase).toHaveLength(1);
    expect(productAttachmentOnDatabase[0].attachmentId).toEqual(
      attachment.id.toString(),
    );
  });
});
