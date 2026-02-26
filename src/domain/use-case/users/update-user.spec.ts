import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { UpdateUserUseCase } from "./update-user";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { EmailAlreadyExists } from "@/domain/errors/email-already-exists";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { PasswordAlreadyExists } from "@/domain/errors/password-already-exists";
import { hash } from "bcryptjs";

let sut: UpdateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Update user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to update an user", async () => {
    const createdUser = makeUser({ id: new UniqueEntityId("user-1") });

    await inMemoryUsersRepository.create(createdUser);

    const { user } = await sut.execute({
      userId: createdUser.id.toString(),
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: createdUser.password,
    });

    expect(user).toEqual(
      expect.objectContaining({ name: "John Doe", email: "johndoe@gmail.com" }),
    );

    expect(user.id.toString()).toEqual(expect.any(String));

    expect(inMemoryUsersRepository.items[0]?.name).toEqual("John Doe");
    expect(inMemoryUsersRepository.items[0]?.id.toString()).toEqual("user-1");
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
    const user1 = makeUser({
      email: "email1@gmail.com",
      id: new UniqueEntityId("user-1"),
    });
    const user2 = makeUser({
      email: "email2@gmail.com",
      id: new UniqueEntityId("user-2"),
    });

    await inMemoryUsersRepository.create(user1);
    await inMemoryUsersRepository.create(user2);

    await expect(
      sut.execute({
        userId: user2.id.toString(),
        email: "email1@gmail.com",
      }),
    ).rejects.toThrowError(EmailAlreadyExists);
  });

  it("It should not be possible to update a user with existent password", async () => {
    const hashedPassword = await hash("old-password", 6);

    const user1 = makeUser({
      id: new UniqueEntityId("user-1"),
      password: hashedPassword,
    });

    await inMemoryUsersRepository.create(user1);

    await expect(
      sut.execute({
        userId: user1.id.toString(),
        password: "old-password",
      }),
    ).rejects.toThrowError(PasswordAlreadyExists);
  });

  it("Should be able to update only the name", async () => {
    const user = makeUser({ id: new UniqueEntityId("user-1") });
    await inMemoryUsersRepository.create(user);

    const { user: updated } = await sut.execute({
      userId: user.id.toString(),
      name: "New Name",
    });

    expect(updated.name).toBe("New Name");
    expect(updated.email).toBe(user.email);
    expect(updated.password).toBe(user.password);
  });
});
