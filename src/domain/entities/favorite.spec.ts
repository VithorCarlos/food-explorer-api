import { randomUUID } from "node:crypto";
import { Favorite } from "./favorite";

describe("Snack entity", () => {
  it("Should be able to create user entity", () => {
    const favorite = Favorite.create({
      id: randomUUID(),
      userId: "user-1",
      snackId: "snack-1",
    });

    expect(favorite).toBeDefined();
  });
});
