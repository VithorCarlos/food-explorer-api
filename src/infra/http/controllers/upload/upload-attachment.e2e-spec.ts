import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import path from "node:path";
import { PrismaService } from "@/infra/database/prisma";
import { buildApp } from "@/app";
import { FastifyInstance } from "fastify";

describe("Upload Attachement (e2e)", () => {
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

  it("should be able to upload an attachment", async () => {
    const email = "johndoe@gmail.com";
    const password = "12345";

    const user = await prisma.user.create({
      data: {
        name: "john doe",
        email,
        password,
      },
    });

    const accessToken = app.jwt.sign({ sub: user.id, role: user.role });

    const filePath = path.resolve(process.cwd(), "test/e2e/sample-upload.jpeg");

    const response = await request(app.server)
      .post(`/upload`)
      .set("Authorization", `Bearer ${accessToken}`)
      .attach("file", filePath);

    expect(response.statusCode).toEqual(201);

    expect(response.body).toEqual({
      attachmentId: expect.any(String),
    });
  });
});
