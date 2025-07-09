import { Request, Response, NextFunction } from "express";
import { FetchStatusUseCase } from "../../../../useCases/sitemanager/Common/FetchStatusUseCase";
import { StageStatusChangeUseCase } from "./StageSatusChangeUseCase";
import cloudinary from "../../../../config/cloudinary";
import { UploadStatusImageUseCase } from "../../../../useCases/sitemanager/Common/UploadStatusImageUseCase";

export class statusController {
   private fetchStatusUseCase: FetchStatusUseCase
   private stageStatusChangeUseCase: StageStatusChangeUseCase
   private uploadstatusImageusecase: UploadStatusImageUseCase
   constructor(fetchStatusUseCase: FetchStatusUseCase, stageStatusChangeUseCase: StageStatusChangeUseCase,
      uploadstatusImageusecase: UploadStatusImageUseCase) {
      this.fetchStatusUseCase = fetchStatusUseCase
      this.stageStatusChangeUseCase = stageStatusChangeUseCase
      this.uploadstatusImageusecase = uploadstatusImageusecase
   }
   fetchStageData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const project_id = req.query.project_id as string;

         if (!project_id) {
            res.status(400).json({ success: false, message: "Missing projectId in query" });
            return;
         }

         const data = await this.fetchStatusUseCase.execute({ projectId: project_id });
         res.status(200).json({ success: true, data });
      } catch (error) {
         console.log(error);
         next(error);
      }
   }
   changeStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.stageStatusChangeUseCase.execute(req.body)
         res.status(200).json(result);
      } catch (error) {
         console.log(error);
         next(error);
      }
   }
   uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

         const file = req.files?.image;
         const { _id, date } = req.body;

         if (!file) {
             res.status(400).json({ error: "No image file uploaded" });
             return
         }

         let urls: string[] = [];

         if (Array.isArray(file)) {
            for (const char of file) {
               const result = await cloudinary.uploader.upload(char.tempFilePath, {
                  folder: "project-status",
               });
               urls.push(result.secure_url);
            }
         } else {
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
               folder: "project-status",
            });
            urls.push(result.secure_url);
         }

         const ExactResult = await this.uploadstatusImageusecase.execute(urls, _id, date);
         res.status(200).json(ExactResult);

      } catch (error) {
         console.log(error);
         next(error);
      }
   }

}