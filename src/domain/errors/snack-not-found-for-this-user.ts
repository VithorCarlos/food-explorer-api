export class SnackNotFoundForThisUser extends Error {
  constructor() {
    super("snack not found for this user");
  }
}
