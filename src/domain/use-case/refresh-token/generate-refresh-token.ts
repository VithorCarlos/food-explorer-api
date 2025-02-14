import { RefreshToken } from "@/domain/entities/refresh-token";
import { RefreshTokenNotFoundError } from "@/domain/errors/refresh-token-not-found";
import { RefreshTokenRepository } from "@/domain/repositories/refresh-token-repository";
import { GenerateToken } from "@/domain/services/generate-token";
import dayjs from "dayjs";

interface GenerateRefreshTokenRequest {
  id: string;
}

export class GenerateRefreshTokenUseCase {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute({ id }: GenerateRefreshTokenRequest) {
    const refreshToken = await this.refreshTokenRepository.findById(id);

    if (!refreshToken) {
      throw new RefreshTokenNotFoundError();
    }

    const currentTimestamp = dayjs().unix();

    if (refreshToken.expiresIn <= currentTimestamp) {
      await this.refreshTokenRepository.delete(refreshToken.id);
      throw new RefreshTokenNotFoundError();
    }

    const expiresIn = dayjs().add(7, "day").unix();

    const accessToken = GenerateToken.generate({
      userId: refreshToken.userId,
    });

    const newRefreshToken = RefreshToken.create({
      userId: refreshToken.userId,
      expiresIn,
    });

    await this.refreshTokenRepository.delete(refreshToken.id);

    await this.refreshTokenRepository.create(newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
