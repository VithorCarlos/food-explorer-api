import { RefreshTokenUseCase } from "./refresh-token";
import { InMemoryRefreshTokenRepository } from "@/test/in-memory-refresh-token";

let sut: RefreshTokenUseCase;
let inMemoryRefreshTokenRepository: InMemoryRefreshTokenRepository;

describe("Create refresh token", () => {
  beforeEach(() => {
    inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();
    sut = new RefreshTokenUseCase(inMemoryRefreshTokenRepository);
  });

  it("Should be able to create a new refresh token", async () => {
    const { refreshToken } = await sut.execute({
      userId: "user-01",
    });

    expect(refreshToken).toEqual(
      expect.objectContaining({ userId: "user-01" })
    );
    expect(refreshToken.id).toEqual(expect.any(String));

    expect(inMemoryRefreshTokenRepository.items[0].id).toEqual(refreshToken.id);
  });
});
