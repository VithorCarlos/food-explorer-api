import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { UserFactory } from "test/factories/make-user";
import { TOKEN } from "@/domain/enums/token";

describe("Find users by id (e2e)", () => {
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

  test("[GET] /users", async () => {
    const user = await userFactory.makeUserToPrisma({ name: "John Doe" });

    const accessToken = app.jwt.sign({
      sub: user.id.toString(),
      role: user.role,
    });

    const response = await request(app.server)
      .get("/users")
      .set("Cookie", [`${TOKEN.ACCESS_TOKEN}=${accessToken}`])
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({ name: "John Doe" }),
    );
  });
});
