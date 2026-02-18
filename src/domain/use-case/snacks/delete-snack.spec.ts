import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { makeSnack } from "test/factories/make-snack";
import { DeleteSnackUseCase } from "./delete-snack";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: DeleteSnackUseCase;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

let inMemorySnacksRepository: InMemorySnacksRepository;

describe("Delete snack", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    sut = new DeleteSnackUseCase(inMemorySnacksRepository);
  });

  it("Should be able to delete an snack", async () => {
    await inMemorySnacksRepository.create(
      makeSnack(
        {
          id: new UniqueEntityId("snack-01"),
          attachmentId: new UniqueEntityId("attachment-01"),
        },
        new UniqueEntityId("user-01"),
      ),
    );

    await inMemorySnacksRepository.create(
      makeSnack(
        {
          id: new UniqueEntityId("snack-02"),
          attachmentId: new UniqueEntityId("attachment-02"),
        },
        new UniqueEntityId("user-02"),
      ),
    );

    await sut.execute({
      id: "snack-01",
      userId: "user-01",
    });

    expect(inMemorySnacksRepository.items).toHaveLength(1);
    expect(inMemoryAttachmentLinkRepository.items).toHaveLength(1);
    expect(inMemoryAttachmentLinkRepository.items[0].attachmentId).not.toEqual(
      "attachment-01",
    );
    expect(inMemorySnacksRepository.items[0].id.toString()).toEqual("snack-02");
  });

  it("It should not be possible to delete a non-existent snack", async () => {
    await expect(
      sut.execute({
        id: "snack-01",
        userId: "user-02",
      }),
    ).rejects.toThrowError(SnackDoesNotExists);
  });

  it("Should not be possible to delete a snack with different user Id created for this one", async () => {
    const snack = makeSnack(
      { id: new UniqueEntityId("snack-01") },
      new UniqueEntityId("user-01"),
    );

    await inMemorySnacksRepository.create(snack);

    await expect(
      sut.execute({
        id: "snack-01",
        userId: "different-user-id-for-this-snack",
      }),
    ).rejects.toThrowError(SnackNotFoundForThisUser);
  });
});
