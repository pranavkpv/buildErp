import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";
import { IUploadStatusImageUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/UploadStatusImageUseCaseEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class UploadStatusImageUseCase implements IUploadStatusImageUseCase{
   private stageRepository : IStageRepository
   constructor(stageRepository : IStageRepository){
      this.stageRepository = stageRepository
   }
   async execute(url:string[]|string,_id:string,date:string):Promise<commonOutput>{
         await this.stageRepository.uploadImageByStageId(_id,url,date)
         return ResponseHelper.success(SUCCESS_MESSAGE.STAGE.UPLOAD_IMAGE,HTTP_STATUS.OK)
   }
}