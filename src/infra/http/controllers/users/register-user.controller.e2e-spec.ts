import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";
import { makeUser } from "test/factories/make-user";

describe("Register user (e2e)", () => {
  let app: FastifyInstance;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await buildApp();
    prisma = new PrismaService();

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("[POST] /users", async () => {
    const createUser = makeUser({
      name: "John Doe",
    });

    const response = await request(app.server).post("/users").send({
      name: createUser.name,
      email: createUser.email,
      password: createUser.password,
    });

    expect(response.statusCode).toEqual(201);

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        name: "John Doe",
      },
    });
    expect(userOnDatabase).toBeTruthy();
  });
});
