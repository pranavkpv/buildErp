import { IStageRepositoryEntity } from "../../../domain/interfaces/Project-management/IStageRepository";
import { commonOutput } from "../../dto/CommonEntities/common";
import { changeStatusInput } from "../../dto/ProjectEntities/Stage";
import { IStageStatusChangeUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/StageStatusChangeUseCaseEntuty";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";

export class StageStatusChangeUseCase implements IStageStatusChangeUseCaseEntity {
   private stagerepository: IStageRepositoryEntity
   constructor(stagerepository: IStageRepositoryEntity) {
      this.stagerepository = stagerepository
   }
   async execute(input: changeStatusInput): Promise<commonOutput> {
      const { stageId, newProgress, date } = input
      await this.stagerepository.changeStageStatus({ stageId, newProgress, date })
      return ResponseHelper.success(StageSuccessMessage.STATUS_CHANGE)
   }
}