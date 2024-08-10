export class SnackDoesNotExists extends Error {
  constructor() {
    super("Snack does not exists");
  }
}
