import { Request, Response, NextFunction } from "express";
import cloudinary from "../../../infrastructure/config/cloudinary";
import { IstatusController } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/IStatusControllerEntity";
import { IStageStatusChangeUseCase} from "../../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/StageStatusChangeUseCaseEntuty";
import { IUploadStatusImageUseCase } from "../../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/UploadStatusImageUseCaseEntity";
import { StageFailedMessage } from "../../../Shared/Messages/Stage.Message";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";
import { commonOutput } from "../../../application/dto/common";

export class statusController implements IstatusController {

   constructor(
      private _stageStatusChangeUseCase: IStageStatusChangeUseCase,
      private _uploadstatusImageusecase: IUploadStatusImageUseCase
   ) { }

   //------------------------------------ Change the status of stage  ------------------------------------//

   changeStatus = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._stageStatusChangeUseCase.execute({ stageId: req.params.id, ...req.body })
      return result
   }

   //------------------------------------ Upload images in based on stages  ------------------------------------//

   uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      const file = req.files?.image;
      const { _id, date } = req.body;
      if (!file) {
         res.status(HTTP_STATUS.OK).json({ error: StageFailedMessage.NO_IMAGE });
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
      const ExactResult = await this._uploadstatusImageusecase.execute(urls, _id, date);
      return ExactResult
   }

}