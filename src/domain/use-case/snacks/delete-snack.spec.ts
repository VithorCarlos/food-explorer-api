import { InMemorySnacksRepository } from "@/test/in-memory-snacks-repository";
import { makeSnack } from "@/test/factories/make-snack";
import { DeleteSnackUseCase } from "./delete-snack";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";

let sut: DeleteSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;

describe("Delete snack", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    sut = new DeleteSnackUseCase(inMemorySnacksRepository);
  });

  it("Should be able to delete an snack", async () => {
    await inMemorySnacksRepository.create(
      makeSnack({ id: "snack-01" }, "user-01")
    );

    await inMemorySnacksRepository.create(
      makeSnack({ id: "snack-02" }, "user-02")
    );

    await sut.execute({
      id: "snack-01",
      userId: "user-01",
    });

    expect(inMemorySnacksRepository.items).toHaveLength(1);
    expect(inMemorySnacksRepository.items[0].id).toEqual("snack-02");
  });

  it("It should not be possible to delete a non-existent snack", async () => {
    await expect(
      sut.execute({
        id: "snack-01",
        userId: "user-02",
      })
    ).rejects.toThrowError(SnackDoesNotExists);
  });

  it("Should not be possible to delete a snack with different user Id created for this one", async () => {
    const snack = makeSnack({ id: "snack-01" }, "user-01");

    await inMemorySnacksRepository.create(snack);

    await expect(
      sut.execute({
        id: "snack-01",
        userId: "different-user-id-for-this-snack",
      })
    ).rejects.toThrowError(SnackNotFoundForThisUser);
  });
});
