import { RefreshToken } from "@/domain/entities/refresh-token";
import { RefreshTokenRepository } from "@/domain/repositories/refresh-token-repository";
import dayjs from "dayjs";

interface RefreshTokenRequest {
  userId: string;
}

export class RefreshTokenUseCase {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute({ userId }: RefreshTokenRequest) {
    const refreshTokenAlreadyExists =
      await this.refreshTokenRepository.findByUserId(userId);

    const expiresIn = dayjs().add(7, "day").unix();

    if (refreshTokenAlreadyExists) {
      await this.refreshTokenRepository.delete(
        refreshTokenAlreadyExists.id.toString(),
      );
    }

    const refreshToken = RefreshToken.create({
      userId,
      expiresIn,
    });

    await this.refreshTokenRepository.create(refreshToken);

    return { refreshToken };
  }
}
