import { Uploader, UploaderParams } from "@/domain/storage/uploader";
import path from "node:path";
import { pipeline, Readable } from "node:stream";
import { promisify } from "node:util";
import fs from "node:fs";
import sharp from "sharp";

export class LocalStorage implements Uploader {
  async upload({ body, fileName }: UploaderParams): Promise<{ url: string }> {
    const pump = promisify(pipeline);

    const uploadDir = path.join("tmp", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.resolve("tmp/uploads", fileName);
    const bufferStream = Readable.from(body);

    const transformer = sharp()
      .resize({ width: 800 })
      .jpeg({ quality: 85 })
      .webp({ quality: 80 })
      .png({ quality: 85, compressionLevel: 8 });

    await pump(bufferStream, transformer, fs.createWriteStream(filePath));

    return {
      url: filePath,
    };
  }
}
