import { InMemoryFavoritesRepository } from "test/repositories/in-memory-favorites-repository";
import { DeleteFavoriteUseCase } from "./delete-favorite";
import { FavoriteDoesNotExists } from "@/domain/errors/favorite-does-not-exists";
import { makeFavorite } from "test/factories/make-favorite";
import { FavoriteNotFoundForThisUser } from "@/domain/errors/favorite-not-found-for-this-user";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { makeSnack } from "test/factories/make-snack";

let sut: DeleteFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Delete favorite", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository(
      inMemorySnacksRepository,
    );
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteFavoriteUseCase(inMemoryFavoritesRepository);

    inMemoryUsersRepository.create(
      makeUser({ id: new UniqueEntityId("user-01") }),
    );

    inMemorySnacksRepository.create(
      makeSnack(
        { attachmentId: new UniqueEntityId("attachment-01") },
        new UniqueEntityId("user-01"),
      ),
    );
  });

  it("Should be able to delete an favorite", async () => {
    await inMemoryFavoritesRepository.create(
      makeFavorite(
        {
          userId: new UniqueEntityId("user-01"),
          snackId: new UniqueEntityId("snack-01"),
        },
        new UniqueEntityId("favorite-01"),
      ),
    );

    await inMemoryFavoritesRepository.create(
      makeFavorite(
        {
          userId: new UniqueEntityId("user-02"),
          snackId: new UniqueEntityId("snack-02"),
        },
        new UniqueEntityId("favorite-02"),
      ),
    );

    await sut.execute({
      snackId: "snack-01",
      userId: "user-01",
    });

    expect(inMemoryFavoritesRepository.items).toHaveLength(1);
    expect(inMemoryFavoritesRepository.items[0].snackId.toString()).toEqual(
      "snack-01",
    );
  });

  it("It should not be possible to delete a non-existent favorite", async () => {
    await expect(
      sut.execute({
        snackId: "snack-01",
        userId: "user-01",
      }),
    ).rejects.toThrowError(FavoriteDoesNotExists);
  });

  it("Should not be possible to delete a favorite with different user Id created for this one", async () => {
    const favorite = makeFavorite(
      {
        snackId: new UniqueEntityId("snack-01"),
        userId: new UniqueEntityId("user-01"),
      },
      new UniqueEntityId("favorite-01"),
    );

    await inMemoryFavoritesRepository.create(favorite);

    await expect(
      sut.execute({
        snackId: "snack-01",
        userId: "different-user-id-for-this-snack",
      }),
    ).rejects.toThrowError(FavoriteNotFoundForThisUser);
  });
});
