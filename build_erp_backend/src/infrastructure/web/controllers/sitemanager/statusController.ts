import { Request, Response, NextFunction } from "express";
import cloudinary from "../../../../config/cloudinary";
import { IstatusControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IStatusControllerEntity";
import { IFetchStatusUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchStatusUseCaseEntity";
import { IStageStatusChangeUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/StageStatusChangeUseCaseEntuty";
import { IUploadStatusImageUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/UploadStatusImageUseCaseEntity";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { ERROR_MESSAGE } from "../../../../Shared/Message";
import { profileEnd } from "console";

export class statusController implements IstatusControllerEntity {
   private fetchStatusUseCase: IFetchStatusUseCase
   private stageStatusChangeUseCase: IStageStatusChangeUseCase
   private uploadstatusImageusecase: IUploadStatusImageUseCase
   constructor(fetchStatusUseCase: IFetchStatusUseCase, stageStatusChangeUseCase: IStageStatusChangeUseCase,
      uploadstatusImageusecase: IUploadStatusImageUseCase) {
      this.fetchStatusUseCase = fetchStatusUseCase
      this.stageStatusChangeUseCase = stageStatusChangeUseCase
      this.uploadstatusImageusecase = uploadstatusImageusecase
   }


   fetchStageData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const project_id = req.params.id
      const data = await this.fetchStatusUseCase.execute({ projectId: project_id });
      res.status(data.status_code).json(data);
   }


   changeStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.stageStatusChangeUseCase.execute({ stageId: req.params.id, ...req.body })
      res.status(result.status_code).json(result);
   }


   uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const file = req.files?.image;
      const { _id, date } = req.body;
      if (!file) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ERROR_MESSAGE.STAGE.NO_IMAGE_UPLOAD });
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
      res.status(ExactResult.status_code).json(ExactResult);
   }

}