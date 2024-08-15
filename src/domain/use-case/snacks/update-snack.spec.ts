import { InMemorySnacksRepository } from "@/test/in-memory-snacks-repository";
import { UdpateSnackUseCase } from "./update-snack";
import { makeSnack } from "@/test/factories/make-snack";
import { InMemoryUsersRepository } from "@/test/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";

let sut: UdpateSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Update snack", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new UdpateSnackUseCase(inMemorySnacksRepository);
  });

  it("Should be able to update an snack", async () => {
    const makedUser = makeUser({ id: "user-01" });
    const makedSnack = makeSnack({ id: "snack-01" }, makedUser.id);

    await inMemoryUsersRepository.create(makedUser);
    await inMemorySnacksRepository.create(makedSnack);

    const { snack } = await sut.execute({
      id: "snack-01",
      userId: "user-01",
      title: "my new snack title",
      description: "my new snack description",
      imageUrl: "https://image-url.com.br",
      price: 500,
    });

    expect(snack).toEqual(
      expect.objectContaining({
        title: "my new snack title",
        description: "my new snack description",
        imageUrl: "https://image-url.com.br",
        price: 500,
      })
    );

    expect(snack.id).toEqual("snack-01");
    expect(snack.userId).toEqual("user-01");
  });

  it("Should be able to update only a snack category", async () => {
    const makedUser = makeUser({ id: "user-01" });
    const makedSnack = makeSnack({ id: "snack-01" }, makedUser.id);

    await inMemoryUsersRepository.create(makedUser);
    await inMemorySnacksRepository.create(makedSnack);

    const { snack } = await sut.execute({
      id: "snack-01",
      userId: "user-01",
      category: "pizza",
    });

    expect(snack).toEqual(
      expect.objectContaining({
        category: "pizza",
      })
    );

    expect(snack.id).toEqual("snack-01");
    expect(snack.userId).toEqual("user-01");
  });

  it("Should be able to update only a snack ingredients", async () => {
    const makedUser = makeUser({ id: "user-01" });
    const makedSnack = makeSnack({ id: "snack-01" }, makedUser.id);

    await inMemoryUsersRepository.create(makedUser);
    await inMemorySnacksRepository.create(makedSnack);

    const { snack } = await sut.execute({
      id: "snack-01",
      userId: "user-01",
      ingredients: [
        "Beat egg whites and sugar until foamy",
        "Whip cream",
        "Fold together cream and egg yolks",
      ],
    });

    expect(snack).toEqual(
      expect.objectContaining({
        ingredients: [
          "Beat egg whites and sugar until foamy",
          "Whip cream",
          "Fold together cream and egg yolks",
        ],
      })
    );

    expect(snack.id).toEqual("snack-01");
    expect(snack.userId).toEqual("user-01");
  });

  it("Should not be possible to update a non-existent snack", async () => {
    const snack = makeSnack({}, "user-01");

    expect(
      async () =>
        await sut.execute({
          id: "unknow-snack",
          userId: snack.userId,
          title: snack.title,
        })
    ).rejects.toThrowError(SnackDoesNotExists);
  });

  it("Should not be possible to update a snack with different user Id created for this one", async () => {
    const snack = makeSnack({ id: "snack-01" }, "user-01");

    await inMemorySnacksRepository.create(snack);

    expect(
      async () =>
        await sut.execute({
          id: "snack-01",
          userId: "different-user-id-for-this-snack",
          title: snack.title,
        })
    ).rejects.toThrowError(SnackNotFoundForThisUser);
  });
});
