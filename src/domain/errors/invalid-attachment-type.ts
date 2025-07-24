export class InvalidAttachmentTypeError extends Error {
  constructor() {
    super("file type is not valid. upload only: png, jpeg or webp images");
  }
}
