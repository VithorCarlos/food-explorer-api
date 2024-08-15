import { InMemoryFavoritesRepository } from "@/test/in-memory-favorites-repository";
import { DeleteFavoriteUseCase } from "./delete-favorite";
import { FavoriteDoesNotExists } from "@/domain/errors/favorite-does-not-exists";
import { makeFavorite } from "@/test/factories/make-favorite";

let sut: DeleteFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;

describe("Delete favorite", () => {
  beforeEach(() => {
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository();
    sut = new DeleteFavoriteUseCase(inMemoryFavoritesRepository);
  });

  it("Should be able to delete an favorite", async () => {
    await inMemoryFavoritesRepository.create(
      makeFavorite({
        id: "favorite-01",
        userId: "user-01",
        snackId: "snack-01",
      })
    );

    await inMemoryFavoritesRepository.create(
      makeFavorite({
        id: "favorite-02",
        userId: "user-02",
        snackId: "snack-02",
      })
    );

    await sut.execute({
      id: "favorite-01",
    });

    expect(inMemoryFavoritesRepository.items).toHaveLength(1);
    expect(inMemoryFavoritesRepository.items[0].id).toEqual("favorite-02");
  });

  it("It should not be possible to delete a non-existent favorite", async () => {
    expect(
      async () =>
        await sut.execute({
          id: "favorite-01",
        })
    ).rejects.toThrowError(FavoriteDoesNotExists);
  });
});
