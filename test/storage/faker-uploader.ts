import {
  Uploader,
  UploaderDeleteParams,
  UploaderParams,
} from "@/domain/storage/uploader";
import { randomUUID } from "node:crypto";

interface Upload {
  fileName: string;
  url: string;
}
export class FakerUploader implements Uploader {
  public uploads: Upload[] = [];
  async upload({ fileName }: UploaderParams): Promise<{ url: string }> {
    const url = randomUUID();

    this.uploads.push({
      fileName,
      url,
    });

    return { url };
  }

  async delete({ key }: UploaderDeleteParams): Promise<void> {
    const itemIndex = this.uploads.findIndex((item) => item.url === key);

    this.uploads.splice(itemIndex, 1);
  }
}
