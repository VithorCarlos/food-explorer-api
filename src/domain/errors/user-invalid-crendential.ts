export class UserInvalidCredential extends Error {
  constructor() {
    super("email or password do not match");
  }
}
