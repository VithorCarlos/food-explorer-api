export class FileTooLargeError extends Error {
  constructor() {
    super("this file is too large. limit: 5mb");
  }
}
