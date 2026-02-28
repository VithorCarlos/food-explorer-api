import { DomainEvents } from "../events/domain-events";
import { EventHandler } from "../events/event-handler";
import { ProductAttachmentChangedEvent } from "../events/product-attachment-changed-event";
import { ProductAttachmentRepository } from "../repositories/product-attachment-repository";
import { Uploader } from "../storage/uploader";

export class OnProductAttachmentChanged implements EventHandler {
  constructor(
    private productAttachmentRepository: ProductAttachmentRepository,
    private uploader: Uploader,
  ) {}

  setupSubscriptions(): void {
    DomainEvents.register(
      this.deleteProductAttachmentFromStorage.bind(this),
      ProductAttachmentChangedEvent.name,
    );
  }

  private async deleteProductAttachmentFromStorage({
    productId,
  }: ProductAttachmentChangedEvent) {
    const attachment = await this.productAttachmentRepository.findByProductId(
      productId.toString(),
    );

    if (attachment?.url) {
      await this.uploader.delete({ key: attachment.url });
    }
  }
}
