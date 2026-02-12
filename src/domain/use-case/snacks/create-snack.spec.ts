import { CreateSnackUseCase } from "./create-snack";
import { InMemorySnacksRepository } from "test/in-memory-snacks-repository";
import { makeSnack } from "test/factories/make-snack";

let sut: CreateSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;

describe("Create snack", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    sut = new CreateSnackUseCase(inMemorySnacksRepository);
  });

  it("Should be able to create a new snack", async () => {
    const createSnack = makeSnack({ title: "snack-1" }, "user-01");

    const { snack } = await sut.execute(createSnack);

    expect(snack).toEqual(expect.objectContaining({ title: "snack-1" }));
    expect(snack.id).toEqual(expect.any(String));

    expect(inMemorySnacksRepository.items[0].title).toEqual("snack-1");
    expect(inMemorySnacksRepository.items[0].id).toEqual(snack.id);
  });
});
