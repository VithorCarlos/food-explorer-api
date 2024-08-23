export class EmailAlreadyExists extends Error {
  constructor() {
    super("email Already Exists");
  }
}
