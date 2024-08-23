export class FavoriteNotFoundForThisUser extends Error {
  constructor() {
    super("favorite not found for this user");
  }
}
