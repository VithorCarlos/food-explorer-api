import { RefreshToken } from "../entities/refresh-token";

export interface RefreshTokenRepository {
  findById(id: string): Promise<RefreshToken | null>;
  findByUserId(id: string): Promise<RefreshToken | null>;
  delete(id: string): Promise<void>;
  create(refreshToken: RefreshToken): Promise<void>;
}
