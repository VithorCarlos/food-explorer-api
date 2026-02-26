import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { FindUserByIdUseCase } from "./find-user-by-id";

let sut: FindUserByIdUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Find user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FindUserByIdUseCase(inMemoryUsersRepository);
  });

  it("Should be able to find an user", async () => {
    await inMemoryUsersRepository.create(
      makeUser({ id: new UniqueEntityId("user-1") }),
    );

    const { user } = await sut.execute({
      userId: "user-1",
    });

    expect(user?.id.toString()).toEqual(expect.any(String));
    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0].id.toString()).toEqual("user-1");
  });
});
