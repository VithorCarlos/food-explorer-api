import { randomUUID } from "node:crypto";
import { User } from "./user";
import { ROLE } from "../enums/role";

describe("User entity", () => {
  it("Shold be able to create user entity", () => {
    const user = User.create({
      id: randomUUID(),
      name: "John Doe",
      email: "johndoe@ab.com",
      password: "123",
      role: ROLE.ADMIN,
    });

    expect(user).toBeDefined();
  });
});
