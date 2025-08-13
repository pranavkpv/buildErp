import { commonOutput } from "../../DTO/CommonEntities/common";
import { IStageRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IStageRepository";
import { IUploadStatusImageUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/UploadStatusImageUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { StageSuccessMessage } from "../../Shared/Messages/Stage.Message";

export class UploadStatusImageUseCase implements IUploadStatusImageUseCaseEntity {
   private stageRepository: IStageRepositoryEntity
   constructor(stageRepository: IStageRepositoryEntity) {
      this.stageRepository = stageRepository
   }
   async execute(url: string[] | string, _id: string, date: string): Promise<commonOutput> {
      await this.stageRepository.uploadImageByStageId({ _id, url, date })
      return ResponseHelper.success(StageSuccessMessage.UPLOAD_IMAGE)
   }
}