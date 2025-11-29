import { IFileUploader } from "../../domain/Entities/Service.Entities/IFileUploaders";
import cloudinary from "../../infrastructure/config/cloudinary";


export class CloudinaryUploader implements IFileUploader {
  async upload(filePath: string): Promise<string> {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "buildExe"
    });
    return result.secure_url;
  }
}