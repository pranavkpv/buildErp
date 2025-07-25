import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { changeStatusInput } from "../../../Entities/Input-OutputEntities/ProjectEntities/Stage";
import { IStageStatusChangeUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/StageStatusChangeUseCaseEntuty";
import { ResponseHelper } from "../../../Shared/utils/response";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class StageStatusChangeUseCase implements IStageStatusChangeUseCase{
   private stagerepository : IStageRepository
   constructor(stagerepository : IStageRepository){
      this.stagerepository = stagerepository
   }
   async execute(input:changeStatusInput):Promise<commonOutput>{
     const {stageId,newProgress,date} = input
     await this.stagerepository.changeStageStatus(stageId,newProgress,date)
     return ResponseHelper.success(SUCCESS_MESSAGE.STAGE.STATUS_CHANGE,HTTP_STATUS.OK)
   }
}