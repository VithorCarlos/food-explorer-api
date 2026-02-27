export class ProductDoesNotExists extends Error {
  constructor() {
    super("product does not exists");
  }
}
