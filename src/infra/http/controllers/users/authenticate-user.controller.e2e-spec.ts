import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { UserFactory } from "test/factories/make-user";
import { hash } from "bcryptjs";

describe("Authenticate user (e2e)", () => {
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

  test("[POST] /session", async () => {
    const hashedPassword = await hash("123456", 8);

    await userFactory.makeUserToPrisma({
      email: "johndoe@test.com",
      password: hashedPassword,
    });

    const response = await request(app.server).post("/session").send({
      email: "johndoe@test.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    );
  });
});
