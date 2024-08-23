export class UserDoesNotExists extends Error {
  constructor() {
    super("user does not exists");
  }
}
