import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { AttachmentFactory } from "test/factories/make-attachment";
import { UserFactory } from "test/factories/make-user";
import { makeSnack } from "test/factories/make-snack";

describe("Create Snack(e2e)", () => {
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

  it("should be able to create an snack", async () => {
    const email = "johndoe@gmail.com";
    const password = "12345";

    const user = await userFactory.makeUserToPrisma({
      email,
      password,
      role: "ADMIN",
    });

    const attachment = await attachmentFactory.makeAttachmentToPrisma();

    const snack = makeSnack({ title: "snack-01" });

    const accessToken = app.jwt.sign({ role: user.role }, { sub: user.id });

    const response = await request(app.server)
      .post(`/snack`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: snack.title,
        description: snack.description,
        category: snack.category,
        ingredients: snack.ingredients,
        price: snack.price,
        userId: user.id,
        attachmentId: attachment.id,
      });

    const snackResponse = response.body.snack;

    const attachmentLinkOnDatabase = await prisma.attachmentLink.findMany({
      where: { resourceId: snackResponse.id, resourceType: "SNACK" },
    });

    expect(snackResponse.id).toEqual(expect.any(String));
    expect(attachmentLinkOnDatabase).toHaveLength(1);
    expect(attachmentLinkOnDatabase[0].attachmentId).toBe(attachment.id);
  });
});
