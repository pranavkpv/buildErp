export interface IFileUploader {
  upload(filePath: string): Promise<string>;
}
