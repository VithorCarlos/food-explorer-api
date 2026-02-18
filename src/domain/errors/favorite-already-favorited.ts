export class FavoriteAlreadyFavorited extends Error {
  constructor() {
    super("favorite already favorited");
  }
}
