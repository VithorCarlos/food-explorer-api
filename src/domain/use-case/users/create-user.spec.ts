import { InMemoryUsersRepository } from "test/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { makeUser } from "test/factories/make-user";
import { UserAlreadyExists } from "@/domain/errors/user-already-exists";

let sut: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to create a new user", async () => {
    const { email, password } = makeUser();

    const { user } = await sut.execute({
      name: "jhon doe",
      email,
      password,
    });

    expect(user).toEqual(expect.objectContaining({ name: "jhon doe" }));
    expect(user.id).toEqual(expect.any(String));

    expect(inMemoryUsersRepository.items[0]?.name).toEqual("jhon doe");
    expect(inMemoryUsersRepository.items[0]?.id).toEqual(user.id);
  });

  it("Should not able to create a user if one exists", async () => {
    const { name, password, email } = makeUser({ email: "johndoe@email.com" });

    await sut.execute({
      name,
      email,
      password,
    });

    await expect(
      sut.execute({
        name,
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists);
  });
});
