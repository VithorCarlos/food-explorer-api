import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { UserFactory } from "test/factories/make-user";
import { TOKEN } from "@/domain/enums/token";

describe("Delete user (e2e)", () => {
  let app: FastifyInstance;
  let prisma: PrismaService;
  let userFactory: UserFactory;

  beforeAll(async () => {
    app = await buildApp();
    prisma = new PrismaService();
    userFactory = new UserFactory(prisma);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("[DELETE] /users", async () => {
    const user = await userFactory.makeUserToPrisma();

    const accessToken = app.jwt.sign({
      sub: user.id.toString(),
      role: user.role,
    });

    const response = await request(app.server)
      .delete("/users")
      .set("Cookie", [`${TOKEN.ACCESS_TOKEN}=${accessToken}`])
      .send();

    const userOnDatabase = await prisma.user.findMany();

    expect(response.statusCode).toEqual(204);
    expect(userOnDatabase).toHaveLength(0);
  });
});
