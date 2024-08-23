export class RefreshTokenNotFoundError extends Error {
  constructor() {
    super("refresh token not found");
  }
}
