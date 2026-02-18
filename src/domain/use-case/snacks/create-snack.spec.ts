import { CreateSnackUseCase } from "./create-snack";
import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { makeSnack } from "test/factories/make-snack";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: CreateSnackUseCase;
let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Create snack", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnacksRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    sut = new CreateSnackUseCase(inMemorySnacksRepository);
  });

  it("Should be able to create a new snack", async () => {
    const createSnack = makeSnack(
      { title: "snack-1" },
      new UniqueEntityId("user-01"),
    );

    const { snack } = await sut.execute({
      title: createSnack.title,
      category: createSnack.category,
      description: createSnack.description,
      ingredients: createSnack.ingredients,
      price: createSnack.price,
      attachmentId: "attachment-01",
      userId: createSnack.userId.toString(),
    });

    expect(snack).toEqual(expect.objectContaining({ title: "snack-1" }));
    expect(snack.id.toString()).toEqual(expect.any(String));
    expect(snack.attachmentLink.attachmentId).toEqual(
      new UniqueEntityId("attachment-01"),
    );
    expect(snack.attachmentLink.resourceId).toEqual(snack.id);

    expect(inMemorySnacksRepository.items[0].title).toEqual("snack-1");
    expect(inMemorySnacksRepository.items[0].id).toEqual(snack.id);
    expect(inMemoryAttachmentLinkRepository.items).toEqual([
      snack.attachmentLink,
    ]);
    expect(inMemoryAttachmentLinkRepository.items[0].attachmentId).toEqual(
      new UniqueEntityId("attachment-01"),
    );
  });
});
