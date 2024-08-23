import { randomUUID } from "node:crypto";
import { RefreshToken } from "./refresh-token";

describe("Refresh token entity", () => {
  it("Should be able to create refresh token entity", () => {
    const refreshToken = RefreshToken.create({
      id: randomUUID(),
      userId: "user-1",
      expiresIn: 1725000304,
    });

    expect(refreshToken).toBeDefined();
  });
});
