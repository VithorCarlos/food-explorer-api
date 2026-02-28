import { DomainEvents } from "../events/domain-events";
import { EventHandler } from "../events/event-handler";
import { ProductAttachmentChangedEvent } from "../events/product-attachment-changed-event";
import { AttachmentRepository } from "../repositories/attachment-repository";
import { Uploader } from "../storage/uploader";

export class OnProductAttachmentChanged implements EventHandler {
  constructor(
    private attachmentsRepository: AttachmentRepository,
    private uploader: Uploader,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.deleteProductAttachmentFromStorageAndDB.bind(this),
      ProductAttachmentChangedEvent.name,
    );
  }

  private async deleteProductAttachmentFromStorageAndDB({
    attachmentId,
  }: ProductAttachmentChangedEvent) {
    const attachment = await this.attachmentsRepository.findById(
      attachmentId.toString(),
    );

    if (attachment?.url) {
      await Promise.all([
        this.uploader.delete({ key: attachment.url }),
        this.attachmentsRepository.delete(attachmentId.toString()),
      ]);
    }
  }
}
