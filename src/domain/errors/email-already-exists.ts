export class EmailAlreadyExists extends Error {
  constructor() {
    super("email already exists");
  }
}
