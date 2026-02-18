import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { makeSnack } from "test/factories/make-snack";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { FindOneSnackUseCase } from "./find-one-snack";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: FindOneSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Find one snack", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    sut = new FindOneSnackUseCase(inMemorySnacksRepository);
  });

  it("Should be able to find one  snack", async () => {
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
          attachmentId: new UniqueEntityId("attachment-01"),
        },
        new UniqueEntityId("user-01"),
      ),
    );

    const { snack } = await sut.execute({
      id: "snack-01",
    });

    expect(inMemorySnacksRepository.items).toHaveLength(2);
    expect(inMemorySnacksRepository.items[0].id.toString()).toEqual("snack-01");
    expect(snack.snackId.toString()).toEqual("snack-01");
  });

  it("It should not be possible to find one a non-existent snack", async () => {
    await expect(
      sut.execute({
        id: "snack-01",
      }),
    ).rejects.toThrowError(SnackDoesNotExists);
  });
});
