export class PasswordAlreadyExists extends Error {
  constructor() {
    super("password already exists");
  }
}
