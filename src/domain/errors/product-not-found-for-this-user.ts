export class ProductNotFoundForThisUser extends Error {
  constructor() {
    super("product not found for this user");
  }
}
