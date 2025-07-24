import { Attachment } from "../entities/attachment";

export interface AttachmentRepository {
  create(attachment: Attachment): Promise<void>;
}
