import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { makeAuthenticateUseCase } from "../../factories/make-authenticate-use-case";
import path from "node:path";

describe("Upload Attachement (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to upload an attachment", async () => {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email: "johndoe@gmail.com",
      password: "12345678",
    });

    const accessToken = app.jwt.sign({ sub: user.id, role: user.role });
    const filePath = path.resolve(
      process.cwd(),
      "src/test/e2e/sample-upload.jpeg"
    );

    const response = await request(app.server)
      .post(`/upload`)
      .set("Authorization", `Bearer ${accessToken}`)
      .attach("file", filePath);

    expect(response.statusCode).toEqual(201);
  });
});
