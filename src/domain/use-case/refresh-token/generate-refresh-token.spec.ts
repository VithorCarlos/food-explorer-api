import { GenerateRefreshTokenUseCase } from "./generate-refresh-token";
import { InMemoryRefreshTokenRepository } from "@/test/in-memory-refresh-token";
import { RefreshToken } from "@/domain/entities/refresh-token";
import dayjs from "dayjs";
import { RefreshTokenNotFoundError } from "@/domain/errors/refresh-token-not-found";

let sut: GenerateRefreshTokenUseCase;
let inMemoryRefreshTokenRepository: InMemoryRefreshTokenRepository;

describe("Generate refresh token", () => {
  beforeEach(() => {
    inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();

    sut = new GenerateRefreshTokenUseCase(inMemoryRefreshTokenRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to generate a new refresh token", async () => {
    const expiresIn = dayjs().add(10, "seconds").unix();

    const createRefresh = RefreshToken.create({
      id: "refresh-01",
      userId: "user-01",
      expiresIn,
    });

    inMemoryRefreshTokenRepository.create(createRefresh);

    const refreshToken = await sut.execute({
      id: "refresh-01",
    });

    expect(refreshToken?.accessToken).toEqual(expect.any(String));
  });

  it("Should not be able to create refresh token if not exists", async () => {
    await expect(
      sut.execute({
        id: "refresh-01",
      })
    ).rejects.toThrowError(RefreshTokenNotFoundError);
  });
});
