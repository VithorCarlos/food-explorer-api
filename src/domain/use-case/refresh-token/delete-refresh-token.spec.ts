import { RefreshToken } from "@/domain/entities/refresh-token";
import { DeleteRefreshTokenUseCase } from "./delete-refresh-token";
import { InMemoryRefreshTokenRepository } from "@/test/in-memory-refresh-token";
import dayjs from "dayjs";
import { RefreshTokenNotFoundError } from "@/domain/errors/refresh-token-not-found";

let sut: DeleteRefreshTokenUseCase;
let inMemoryRefreshTokenRepository: InMemoryRefreshTokenRepository;

describe("Delete refresh token", () => {
  beforeEach(() => {
    inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();
    sut = new DeleteRefreshTokenUseCase(inMemoryRefreshTokenRepository);
  });

  it("Should be able to delete an refresh token", async () => {
    const expiresIn = dayjs().add(10, "seconds").unix();

    const createRefresh = RefreshToken.create({
      id: "refresh-01",
      userId: "user-01",
      expiresIn,
    });

    inMemoryRefreshTokenRepository.create(createRefresh);

    await sut.execute({
      userId: "user-01",
    });

    expect(inMemoryRefreshTokenRepository.items).toHaveLength(0);
  });

  it("Should not be able to delete refresh token if not exists", async () => {
    await expect(
      sut.execute({
        userId: "user-01",
      })
    ).rejects.toThrowError(RefreshTokenNotFoundError);
  });
});
