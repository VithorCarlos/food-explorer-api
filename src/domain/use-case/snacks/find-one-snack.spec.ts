import { InMemorySnacksRepository } from "@/test/in-memory-snacks-repository";
import { makeSnack } from "@/test/factories/make-snack";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { FindOneSnackUseCase } from "./find-one-snack";

let sut: FindOneSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;

describe("Find one snack", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    sut = new FindOneSnackUseCase(inMemorySnacksRepository);
  });

  it("Should be able to find one  snack", async () => {
    await inMemorySnacksRepository.create(makeSnack({ id: "snack-01" }));

    await inMemorySnacksRepository.create(makeSnack({ id: "snack-02" }));

    const { snack } = await sut.execute({
      id: "snack-01",
    });

    expect(inMemorySnacksRepository.items).toHaveLength(2);
    expect(inMemorySnacksRepository.items[0].id).toEqual("snack-01");
    expect(snack.id).toEqual("snack-01");
  });

  it("It should not be possible to find one a non-existent snack", async () => {
    expect(
      async () =>
        await sut.execute({
          id: "snack-01",
        })
    ).rejects.toThrowError(SnackDoesNotExists);
  });
});
