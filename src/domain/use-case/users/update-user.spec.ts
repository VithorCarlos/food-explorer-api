import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { UpdateUserUseCase } from "./update-user";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { EmailAlreadyExists } from "@/domain/errors/email-already-exists";

let sut: UpdateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Update user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to update an user", async () => {
    const createdUser = makeUser({ id: "user-1" });

    await inMemoryUsersRepository.create(createdUser);

    const { user } = await sut.execute({
      userId: "user-1",
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: createdUser.password,
    });

    expect(user).toEqual(
      expect.objectContaining({ name: "John Doe", email: "johndoe@gmail.com" }),
    );

    expect(user.id).toEqual(expect.any(String));

    expect(inMemoryUsersRepository.items[0]?.name).toEqual("John Doe");
    expect(inMemoryUsersRepository.items[0]?.id).toEqual("user-1");
  });

  it("It should not be possible to update a non-existent user", async () => {
    const { name, email, password } = makeUser();

    await expect(
      sut.execute({
        userId: "user-1",
        name,
        email,
        password,
      }),
    ).rejects.toThrowError(UserDoesNotExists);
  });

  it("It should not be possible to update a user with existent email", async () => {
    const user = makeUser({ email: "johndoe@gmail.com", id: "user-1" });

    await inMemoryUsersRepository.create(user);

    await expect(
      sut.execute({
        userId: user.id,
        name: user.name,
        email: "johndoe@gmail.com",
        password: user.password,
      }),
    ).rejects.toThrowError(EmailAlreadyExists);
  });
});
