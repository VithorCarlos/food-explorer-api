import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { SearchSnackUseCase } from "./search-snack";
import { makeSnack } from "test/factories/make-snack";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: SearchSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Search many snacks", () => {
  beforeEach(async () => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    sut = new SearchSnackUseCase(inMemorySnacksRepository);

    for (let i = 1; i <= 12; i++) {
      const snack = makeSnack(
        {
          title: `snack-${i}`,
          ingredients: [`cheese-${i}`, `capchup-${i}`],
          attachmentId: new UniqueEntityId("attachment-" + i),
        },
        new UniqueEntityId("user-01"),
      );
      await inMemorySnacksRepository.create(snack);
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

    expect(snacks.data).toHaveLength(5);
    expect(inMemorySnacksRepository.items).toHaveLength(12);
  });

  it("Should be able to search many snacks filtering by title", async () => {
    const { snacks } = await sut.execute({
      page: 1,
      title: "snack-5",
    });
    expect(snacks.data).toHaveLength(1);
    expect(snacks.data[0].title).toEqual("snack-5");

    expect(inMemorySnacksRepository.items).toHaveLength(12);
  });

  it("Should be able to search many snacks filtering by igredients", async () => {
    await inMemorySnacksRepository.create(
      makeSnack(
        {
          title: "Snack Doe",
          ingredients: ["rice", "sugar"],
          attachmentId: new UniqueEntityId("attachment-01"),
        },
        new UniqueEntityId("user-01"),
      ),
    );

    const { snacks } = await sut.execute({
      page: 1,
      ingredients: ["rice", "sugar"],
    });
    expect(snacks.data).toHaveLength(1);

    expect(snacks.data[0].ingredients).toEqual(
      expect.arrayContaining(["rice", "sugar"]),
    );

    expect(snacks.data[0].title).toEqual("Snack Doe");
  });

  it("Should be able to search many snacks filtering by title and igredients", async () => {
    await inMemorySnacksRepository.create(
      makeSnack(
        {
          title: "Snack Doe",
          ingredients: ["rice", "sugar"],
          attachmentId: new UniqueEntityId("attachment-01"),
        },
        new UniqueEntityId("user-01"),
      ),
    );

    const { snacks } = await sut.execute({
      page: 1,
      perPage: 10,
      title: "Snack Doe",
      ingredients: ["rice", "sugar"],
    });

    expect(snacks.data).toHaveLength(1);

    expect(snacks.data[0].ingredients).toEqual(
      expect.arrayContaining(["rice", "sugar"]),
    );

    expect(snacks.data[0].title).toEqual("Snack Doe");
  });
});
