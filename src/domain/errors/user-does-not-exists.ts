export class UserDoesNotExists extends Error {
  constructor() {
    super("User Does Not Exists");
  }
}
