import { InMemoryUsersRepository } from "@/test/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { makeUser } from "@/test/factories/make-user";

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
    expect(inMemoryUsersRepository.items[0]?.name).toEqual("jhon doe");
  });
});
