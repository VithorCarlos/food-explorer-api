import { InMemoryFavoritesRepository } from "test/repositories/in-memory-favorites-repository";
import { makeFavorite } from "test/factories/make-favorite";
import { FindManyFavoriteUseCase } from "./find-many-favorites";
import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { makeSnack } from "test/factories/make-snack";

let sut: FindManyFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Find many favorites", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository(
      inMemorySnacksRepository,
    );
    sut = new FindManyFavoriteUseCase(inMemoryFavoritesRepository);
  });

  it("Should be able to find many favorites", async () => {
    for (let i = 1; i <= 12; i++) {
      await inMemorySnacksRepository.create(
        makeSnack(
          {
            attachmentId: new UniqueEntityId(`attachment-${i}`),
            userId: new UniqueEntityId("user-01"),
          },
          new UniqueEntityId(`snack-${i}`),
        ),
      );
      await inMemoryFavoritesRepository.create(
        makeFavorite(
          {
            userId: new UniqueEntityId("user-01"),
            snackId: new UniqueEntityId(`snack-${i}`),
          },
          new UniqueEntityId(`favorite-${i}`),
        ),
      );
    }
    const { favorites } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(favorites).toHaveLength(2);
    expect(inMemoryFavoritesRepository.items).toHaveLength(12);
  });
});
