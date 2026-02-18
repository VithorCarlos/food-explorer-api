import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { CreateFavoriteUseCase } from "./create-favorite";
import { InMemoryFavoritesRepository } from "test/repositories/in-memory-favorites-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { makeSnack } from "test/factories/make-snack";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: CreateFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Create favorite", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository(
      inMemorySnacksRepository,
    );
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new CreateFavoriteUseCase(inMemoryFavoritesRepository);
  });

  it("Should be able to create a new favorite", async () => {
    const createUser = makeUser({ id: new UniqueEntityId("user-01") });
    const createSnack = makeSnack(
      {
        id: new UniqueEntityId("snack-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      createUser.id,
    );

    await inMemoryUsersRepository.create(createUser);
    await inMemorySnacksRepository.create(createSnack);

    const favorite = await sut.execute({
      userId: createUser.id.toString(),
      snackId: createSnack.id.toString(),
    });

    expect(favorite?.userId.toString()).toEqual("user-01");
    expect(favorite?.snackId.toString()).toEqual("snack-01");

    expect(inMemoryFavoritesRepository.items[0].userId.toString()).toEqual(
      "user-01",
    );
    expect(inMemoryFavoritesRepository.items[0].snackId.toString()).toEqual(
      "snack-01",
    );
  });
});
