export interface UploaderParams {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export interface UploaderDeleteParams {
  key: string;
}

export abstract class Uploader {
  abstract upload(params: UploaderParams): Promise<{ url: string }>;
  abstract delete(params: UploaderDeleteParams): Promise<void>;
}
