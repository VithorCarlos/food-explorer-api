import { InMemoryFavoritesRepository } from "@/test/in-memory-favorites-repository";
import { DeleteFavoriteUseCase } from "./delete-favorite";
import { FavoriteDoesNotExists } from "@/domain/errors/favorite-does-not-exists";
import { makeFavorite } from "@/test/factories/make-favorite";
import { FavoriteNotFoundForThisUser } from "@/domain/errors/favorite-not-found-for-this-user";
import { InMemoryUsersRepository } from "@/test/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";

let sut: DeleteFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Delete favorite", () => {
  beforeEach(() => {
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteFavoriteUseCase(inMemoryFavoritesRepository);

    inMemoryUsersRepository.create(makeUser({ id: "user-01" }));
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
      userId: "user-01",
    });

    expect(inMemoryFavoritesRepository.items).toHaveLength(1);
    expect(inMemoryFavoritesRepository.items[0].id).toEqual("favorite-02");
  });

  it("It should not be possible to delete a non-existent favorite", async () => {
    expect(
      async () =>
        await sut.execute({
          id: "favorite-01",
          userId: "user-01",
        })
    ).rejects.toThrowError(FavoriteDoesNotExists);
  });

  it("Should not be possible to delete a favorite with different user Id created for this one", async () => {
    const favorite = makeFavorite({
      id: "favorite-01",
      snackId: "snack-01",
      userId: "user-01",
    });

    await inMemoryFavoritesRepository.create(favorite);

    expect(
      async () =>
        await sut.execute({
          id: "favorite-01",
          userId: "different-user-id-for-this-snack",
        })
    ).rejects.toThrowError(FavoriteNotFoundForThisUser);
  });
});
