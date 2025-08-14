import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { makeAuthenticateUseCase } from "../../factories/make-authenticate-use-case";
import path from "node:path";
import { makeRegisterUserUseCase } from "../../factories/make-register-user-use-case";

describe("Upload Attachement (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to upload an attachment", async () => {
    const registerUseCase = makeRegisterUserUseCase();
    const authenticateUseCase = makeAuthenticateUseCase();

    const email = "johndoe@gmail.com";
    const password = "johndoe@gmail.com";

    await registerUseCase.execute({
      name: "john doe",
      email,
      password,
    });

    const { user } = await authenticateUseCase.execute({
      email,
      password,
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

    expect(response.body).toEqual({ attachmentId: expect.any(String) });
  });
});
