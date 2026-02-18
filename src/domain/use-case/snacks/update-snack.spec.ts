import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { UdpateSnackUseCase } from "./update-snack";
import { makeSnack } from "test/factories/make-snack";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: UdpateSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Update snack", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new UdpateSnackUseCase(inMemorySnacksRepository);
  });

  it("Should be able to update an snack", async () => {
    const makedUser = makeUser({ id: new UniqueEntityId("user-01") });
    const makedSnack = makeSnack(
      {
        id: new UniqueEntityId("snack-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      makedUser.id,
    );
    await inMemoryUsersRepository.create(makedUser);
    await inMemorySnacksRepository.create(makedSnack);

    const { snack } = await sut.execute({
      snackId: "snack-01",
      userId: "user-01",
      title: "my new snack title",
      description: "my new snack description",
      price: 500,
    });

    expect(snack).toEqual(
      expect.objectContaining({
        title: "my new snack title",
        description: "my new snack description",
        price: 500,
      }),
    );

    expect(snack.id.toString()).toEqual("snack-01");
    expect(snack.userId.toString()).toEqual("user-01");
  });

  it("Should be able to update an snack with attachment", async () => {
    const makedUser = makeUser({ id: new UniqueEntityId("user-01") });
    const makedSnack = makeSnack(
      {
        id: new UniqueEntityId("snack-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      makedUser.id,
    );
    await inMemoryUsersRepository.create(makedUser);
    await inMemorySnacksRepository.create(makedSnack);

    const { snack } = await sut.execute({
      snackId: "snack-01",
      userId: "user-01",
      attachmentId: "new-attachment",
    });

    expect(snack.id.toString()).toEqual("snack-01");

    expect(snack.attachmentLink.attachmentId.toString()).not.toEqual(
      "attachment-01",
    );

    expect(snack.attachmentLink.attachmentId.toString()).toEqual(
      "new-attachment",
    );
    expect(snack.userId.toString()).toEqual("user-01");
  });

  it("Should be able to update only a snack category", async () => {
    const makedUser = makeUser({ id: new UniqueEntityId("user-01") });
    const makedSnack = makeSnack(
      {
        id: new UniqueEntityId("snack-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      makedUser.id,
    );

    await inMemoryUsersRepository.create(makedUser);
    await inMemorySnacksRepository.create(makedSnack);

    const { snack } = await sut.execute({
      snackId: "snack-01",
      userId: "user-01",
      category: FOOD_CATEGORIES.PIZZA,
    });

    expect(snack).toEqual(
      expect.objectContaining({
        category: FOOD_CATEGORIES.PIZZA,
      }),
    );

    expect(snack.id.toString()).toEqual("snack-01");
    expect(snack.userId.toString()).toEqual("user-01");
  });

  it("Should be able to update only a snack ingredients", async () => {
    const makedUser = makeUser({
      id: new UniqueEntityId("user-01"),
    });
    const makedSnack = makeSnack(
      {
        id: new UniqueEntityId("snack-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      makedUser.id,
    );

    await inMemoryUsersRepository.create(makedUser);
    await inMemorySnacksRepository.create(makedSnack);

    const { snack } = await sut.execute({
      snackId: "snack-01",
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
      }),
    );

    expect(snack.id.toString()).toEqual("snack-01");
    expect(snack.userId.toString()).toEqual("user-01");
  });

  it("Should not be possible to update a non-existent snack", async () => {
    const snack = makeSnack({}, new UniqueEntityId("user-01"));

    await expect(
      sut.execute({
        snackId: "unknow-snack",
        userId: snack.userId.toString(),
        title: snack.title,
      }),
    ).rejects.toThrowError(SnackDoesNotExists);
  });

  it("Should not be possible to update a snack with different user Id created for this one", async () => {
    const snack = makeSnack(
      {
        id: new UniqueEntityId("snack-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      new UniqueEntityId("user-01"),
    );

    await inMemorySnacksRepository.create(snack);

    await expect(
      sut.execute({
        snackId: "snack-01",
        userId: "different-user-id-for-this-snack",
        title: snack.title,
      }),
    ).rejects.toThrowError(SnackNotFoundForThisUser);
  });
});
