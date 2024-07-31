export class UserInvalid extends Error {
  constructor() {
    super("Email or password do not match");
  }
}
