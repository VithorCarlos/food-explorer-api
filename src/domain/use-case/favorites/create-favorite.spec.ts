import { InMemorySnacksRepository } from "@/test/in-memory-snacks-repository";
import { CreateFavoriteUseCase } from "./create-favorite";
import { InMemoryFavoritesRepository } from "@/test/in-memory-favorites-repository";
import { InMemoryUsersRepository } from "@/test/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { makeSnack } from "@/test/factories/make-snack";

let sut: CreateFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemorySnacksRepository: InMemorySnacksRepository;

describe("Create favorite", () => {
  beforeEach(() => {
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository();
    sut = new CreateFavoriteUseCase(inMemoryFavoritesRepository);
  });

  it("Should be able to create a new favorite", async () => {
    const createUser = makeUser({ id: "user-01" });
    const createSnack = makeSnack({ id: "snack-01" }, createUser.id);

    await inMemoryUsersRepository.create(createUser);
    await inMemorySnacksRepository.create(createSnack);

    const { favorite } = await sut.execute({
      userId: createUser.id,
      snackId: createSnack.id,
    });

    expect(favorite.userId).toEqual("user-01");
    expect(favorite.snackId).toEqual("snack-01");

    expect(inMemoryFavoritesRepository.items[0].userId).toEqual("user-01");
    expect(inMemoryFavoritesRepository.items[0].snackId).toEqual("snack-01");
  });
});
