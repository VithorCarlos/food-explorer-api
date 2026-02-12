import { Uploader, UploaderParams } from "@/domain/storage/uploader";
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
}
