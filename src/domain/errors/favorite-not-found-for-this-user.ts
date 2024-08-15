export class FavoriteNotFoundForThisUser extends Error {
  constructor() {
    super("Favorite not found for this user");
  }
}
