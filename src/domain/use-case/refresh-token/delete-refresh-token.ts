import { RefreshTokenNotFoundError } from "@/domain/errors/refresh-token-not-found";
import { RefreshTokenRepository } from "@/domain/repositories/refresh-token-repository";

interface DeleteRefreshTokenRequest {
  userId: string;
}

export class DeleteRefreshTokenUseCase {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute({ userId }: DeleteRefreshTokenRequest) {
    const refreshTokenAlreadyExists =
      await this.refreshTokenRepository.findByUserId(userId);

    if (!refreshTokenAlreadyExists) {
      throw new RefreshTokenNotFoundError();
    }

    await this.refreshTokenRepository.delete(refreshTokenAlreadyExists.id);
  }
}
