import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { makeSnack } from "test/factories/make-snack";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { FindActiveCategoriesUseCase } from "./find-active-categories";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";

let sut: FindActiveCategoriesUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Find Actice Categories", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    sut = new FindActiveCategoriesUseCase(inMemorySnacksRepository);
  });

  it("Should return active categories", async () => {
    for (let i = 0; i < 4; i++) {
      await inMemorySnacksRepository.create(
        makeSnack(
          {
            attachmentId: new UniqueEntityId("attachment-01"),
            category: FOOD_CATEGORIES.MEATS,
          },
          new UniqueEntityId("user-01"),
        ),
      );

      await inMemorySnacksRepository.create(
        makeSnack(
          {
            attachmentId: new UniqueEntityId("attachment-02"),
            category: FOOD_CATEGORIES.BRAZILIAN,
          },
          new UniqueEntityId("user-01"),
        ),
      );
    }

    const { categories } = await sut.execute();

    expect(categories).toEqual(expect.arrayContaining(["MEATS", "BRAZILIAN"]));
    expect(categories).toHaveLength(2);
  });
});
