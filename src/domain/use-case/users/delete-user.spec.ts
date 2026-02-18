import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { DeleteUserUseCase } from "./delete-user";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: DeleteUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Delete user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to delete an user", async () => {
    await inMemoryUsersRepository.create(
      makeUser({ id: new UniqueEntityId("user-1") }),
    );
    await inMemoryUsersRepository.create(
      makeUser({ id: new UniqueEntityId("user-2") }),
    );

    await sut.execute({
      userId: "user-1",
    });

    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0].id.toString()).toEqual("user-2");
  });

  it("It should not be possible to delete a non-existent user", async () => {
    await expect(
      sut.execute({
        userId: "user-1",
      }),
    ).rejects.toThrowError(UserDoesNotExists);
  });
});
