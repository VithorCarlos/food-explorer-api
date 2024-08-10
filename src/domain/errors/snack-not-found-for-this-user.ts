export class SnackNotFoundForThisUser extends Error {
  constructor() {
    super("Snack not found for this user");
  }
}
