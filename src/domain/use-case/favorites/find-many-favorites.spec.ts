import { InMemoryFavoritesRepository } from "@/test/in-memory-favorites-repository";
import { makeFavorite } from "@/test/factories/make-favorite";
import { FindManyFavoriteUseCase } from "./find-many-favorites";

let sut: FindManyFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;

describe("Find many favorites", () => {
  beforeEach(() => {
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository();
    sut = new FindManyFavoriteUseCase(inMemoryFavoritesRepository);
  });

  it("Should be able to find many favorites", async () => {
    for (let i = 1; i <= 12; i++) {
      await inMemoryFavoritesRepository.create(
        makeFavorite({
          id: `favorite-${i}`,
          userId: "user-01",
          snackId: `snack-${i}`,
        })
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
