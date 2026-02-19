import {
  Uploader,
  UploaderDeleteParams,
  UploaderParams,
} from "@/domain/storage/uploader";
import { env } from "@/env";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

export class R2Storage implements Uploader {
  private client: S3Client;

  constructor() {
    const accountId = env.CLOUDFARE_ACCOUNT_ID;
    const accessKeyId = env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async upload({ body, fileName, fileType }: UploaderParams) {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;
    const bucketName = env.AWS_BUCKET_NAME;

    await this.client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    );

    return {
      url: uniqueFileName,
    };
  }

  async delete({ key }: UploaderDeleteParams): Promise<void> {
    const bucketName = env.AWS_BUCKET_NAME;

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
  }
}
