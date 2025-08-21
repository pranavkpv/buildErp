
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { IStageRepository } from "../../../domain/interfaces/Project-management/IStageRepository";
import { IUploadStatusImageUseCase } from "../../interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/UploadStatusImageUseCaseEntity";
import { commonOutput } from "../../dto/common";

export class UploadStatusImageUseCase implements IUploadStatusImageUseCase {
   constructor(
       private stageRepository: IStageRepository
   ) { }
   async execute(url: string[] | string, _id: string, date: string): Promise<commonOutput> {
      await this.stageRepository.uploadImageByStageId({ _id, url, date })
      return ResponseHelper.success(StageSuccessMessage.UPLOAD_IMAGE)
   }
}