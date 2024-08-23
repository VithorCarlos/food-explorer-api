import { InMemoryUsersRepository } from "@/test/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate";
import { makeUser } from "@/test/factories/make-user";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UserInvalidCredential } from "@/domain/errors/user-invalid-crendential";
import { hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import { env } from "@/env";

describe("Authenticate test", () => {
  let sut: AuthenticateUserUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to authenticate", async () => {
    const password_hash = await hash("mypassword", 6);

    const makedUser = makeUser({
      id: "user-01",
      email: "johndoe@gmail.com",
      password: password_hash,
    });

    inMemoryUsersRepository.create(makedUser);

    const { accessToken } = await sut.execute({
      email: makedUser.email,
      password: "mypassword",
    });

    const decoded = verify(accessToken, env.JWT_SECRET);

    expect(decoded).toEqual(expect.objectContaining({ sub: "user-01" }));
  });

  it("Should not be able to authenticate if user doesn't exists", () => {
    expect(
      async () =>
        await sut.execute({
          email: "johndoe@gmail.com",
          password: "123test",
        })
    ).rejects.toBeInstanceOf(UserDoesNotExists);
  });

  it("Should not be able to authenticate if user password not match", async () => {
    const pass_test = await hash("pass-test", 6);
    const wrong_password = await hash("wrong-password", 6);

    const makedUser = makeUser({
      email: "johndoe@gmail.com",
      password: pass_test,
    });

    inMemoryUsersRepository.create(makedUser);

    expect(
      async () =>
        await sut.execute({
          email: "johndoe@gmail.com",
          password: wrong_password,
        })
    ).rejects.toBeInstanceOf(UserInvalidCredential);
  });
});
