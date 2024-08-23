export class SnackDoesNotExists extends Error {
  constructor() {
    super("snack does not exists");
  }
}
