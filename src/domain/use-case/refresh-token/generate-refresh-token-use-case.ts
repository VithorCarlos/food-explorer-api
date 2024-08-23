import { RefreshToken } from "@/domain/entities/refresh-token";
import { RefreshTokenNotFoundError } from "@/domain/errors/refresh-token-not-found";
import { RefreshTokenRepository } from "@/domain/repositories/refresh-token-repository";
import { UsersRepository } from "@/domain/repositories/users-repository";
import { GenerateToken } from "@/domain/services/generate-token";
import dayjs from "dayjs";

interface GenerateRefreshTokenRequest {
  id: string;
}

export class GenerateRefreshTokenUseCase {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({ id }: GenerateRefreshTokenRequest) {
    const refreshToken = await this.refreshTokenRepository.findById(id);

    if (!refreshToken) {
      throw new RefreshTokenNotFoundError();
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const user = await this.usersRepository.findById(refreshToken.userId);

    const accessToken = GenerateToken.generate({
      userId: refreshToken.userId,
    });

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.delete(refreshToken.id);
      const expiresIn = dayjs().add(7, "day").unix();

      const newRefreshToken = RefreshToken.create({
        userId: user!.id,
        expiresIn,
      });

      await this.refreshTokenRepository.create(newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    }

    return { accessToken };
  }
}
