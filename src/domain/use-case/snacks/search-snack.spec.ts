import { InMemorySnacksRepository } from "test/in-memory-snacks-repository";
import { SearchSnackUseCase } from "./search-snack";
import { makeSnack } from "test/factories/make-snack";

let sut: SearchSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;

describe("Search many snacks", () => {
  beforeEach(async () => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    sut = new SearchSnackUseCase(inMemorySnacksRepository);

    for (let i = 1; i <= 12; i++) {
      await inMemorySnacksRepository.create(
        makeSnack(
          {
            title: `snack-${i}`,
            ingredients: [`cheese-${i}`, `capchup-${i}`],
          },
          "user-01",
        ),
      );
    }
  });

  afterEach(() => {
    inMemorySnacksRepository.items = [];
  });

  it("Should be able to search many snacks without query", async () => {
    const { snacks } = await sut.execute({
      page: 2,
      perPage: 5,
    });

    expect(snacks).toHaveLength(5);
    expect(inMemorySnacksRepository.items).toHaveLength(12);
  });

  it("Should be able to search many snacks filtering by title", async () => {
    const { snacks } = await sut.execute({
      page: 1,
      title: "snack-5",
    });
    expect(snacks).toHaveLength(1);
    expect(snacks[0].title).toEqual("snack-5");

    expect(inMemorySnacksRepository.items).toHaveLength(12);
  });

  it("Should be able to search many snacks filtering by igredients", async () => {
    await inMemorySnacksRepository.create(
      makeSnack(
        {
          title: "Snack Doe",
          ingredients: ["rice", "sugar"],
        },
        "user-01",
      ),
    );

    const { snacks } = await sut.execute({
      page: 1,
      ingredients: ["rice", "sugar"],
    });

    expect(snacks).toHaveLength(1);

    expect(snacks[0].ingredients).toEqual(
      expect.arrayContaining(["rice", "sugar"]),
    );

    expect(snacks[0].title).toEqual("Snack Doe");
  });

  it("Should be able to search many snacks filtering by title and igredients", async () => {
    await inMemorySnacksRepository.create(
      makeSnack(
        {
          title: "Snack Doe",
          ingredients: ["rice", "sugar"],
        },
        "user-01",
      ),
    );

    const { snacks } = await sut.execute({
      page: 1,
      title: "Snack Doe",
      ingredients: ["rice", "sugar"],
    });

    expect(snacks).toHaveLength(1);

    expect(snacks[0].ingredients).toEqual(
      expect.arrayContaining(["rice", "sugar"]),
    );

    expect(snacks[0].title).toEqual("Snack Doe");
  });
});
