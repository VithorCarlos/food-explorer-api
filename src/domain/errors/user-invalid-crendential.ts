export class UserInvalidCredential extends Error {
  constructor() {
    super("Email or password do not match");
  }
}
