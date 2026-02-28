import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { makeUser, UserFactory } from "test/factories/make-user";
import { compare } from "bcryptjs";
import { TOKEN } from "@/domain/enums/token";

describe("Update user (e2e)", () => {
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

  test("[PUT] /users", async () => {
    const user = await userFactory.makeUserToPrisma({ name: "John Doe" });

    const accessToken = app.jwt.sign({
      sub: user.id.toString(),
      role: user.role,
    });
    const newPassord = "new-password";

    const response = await request(app.server)
      .put("/users")
      .set("Cookie", [`${TOKEN.ACCESS_TOKEN}=${accessToken}`])
      .send({
        name: "new user",
        email: "newemail@test.com",
        password: newPassord,
      });

    const userOnDatabase = await prisma.user.findFirst({
      where: { name: "new user" },
    });
    expect(response.statusCode).toEqual(204);

    const isPasswordValid = await compare(newPassord, userOnDatabase!.password);

    expect(userOnDatabase?.name).toEqual("new user");
    expect(userOnDatabase?.email).toEqual("newemail@test.com");
    expect(isPasswordValid).toEqual(true);
  });
});
