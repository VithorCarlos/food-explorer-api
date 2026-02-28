import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { UserFactory } from "test/factories/make-user";
import { env } from "@/env";
import { ROLE } from "@/domain/enums/role";
import jwt from "jsonwebtoken";
import { TOKEN } from "@/domain/enums/token";

describe("Refresh Token (e2e)", () => {
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

  test("[PATCH] /refresh-token", async () => {
    const user = await userFactory.makeUserToPrisma({ name: "John Doe" });

    const refreshToken = jwt.sign({ role: ROLE.CLIENT }, env.JWT_SECRET, {
      subject: user.id.toString(),
      expiresIn: "7d",
    });

    const response = await request(app.server)
      .patch("/refresh-token")
      .set("Cookie", [`${TOKEN.REFRESH_TOKEN}=${refreshToken}`])
      .send();

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    );
  });
});
