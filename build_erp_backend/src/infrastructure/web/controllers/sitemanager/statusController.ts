import { Request, Response, NextFunction } from "express";
import cloudinary from "../../../../config/cloudinary";
import { IstatusControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IStatusControllerEntity";
import { IFetchStatusUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchStatusUseCaseEntity";
import { IStageStatusChangeUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/StageStatusChangeUseCaseEntuty";
import { IUploadStatusImageUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/UploadStatusImageUseCaseEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { StageFailedMessage } from "../../../../Shared/Messages/Stage.Message";
import { HTTP_STATUS } from "../../../../Shared/Status_code";

export class statusController implements IstatusControllerEntity {
   private fetchStatusUseCase: IFetchStatusUseCaseEntity
   private stageStatusChangeUseCase: IStageStatusChangeUseCaseEntity
   private uploadstatusImageusecase: IUploadStatusImageUseCaseEntity
   constructor(fetchStatusUseCase: IFetchStatusUseCaseEntity, stageStatusChangeUseCase: IStageStatusChangeUseCaseEntity,
      uploadstatusImageusecase: IUploadStatusImageUseCaseEntity) {
      this.fetchStatusUseCase = fetchStatusUseCase
      this.stageStatusChangeUseCase = stageStatusChangeUseCase
      this.uploadstatusImageusecase = uploadstatusImageusecase
   }

   //------------------------------------ Fetch the stages corresponding project  ------------------------------------//

   fetchStageData = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const project_id = req.params.id
      const data = await this.fetchStatusUseCase.execute({ projectId: project_id });
      return data
   }

   //------------------------------------ Change the status of stage  ------------------------------------//

   changeStatus = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.stageStatusChangeUseCase.execute({ stageId: req.params.id, ...req.body })
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
      const ExactResult = await this.uploadstatusImageusecase.execute(urls, _id, date);
      return ExactResult
   }

}