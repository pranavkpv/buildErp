import { IStageStatusChangeUseCase } from "../../interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/StageStatusChangeUseCaseEntuty";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { IStageRepository } from "../../../domain/interfaces/Project-management/IStageRepository";
import { changeStatusInput } from "../../entities/sitemanager.entity";
import { commonOutput } from "../../dto/common";

export class StageStatusChangeUseCase implements IStageStatusChangeUseCase {
   
   constructor(
      private _stagerepository: IStageRepository
   ) { }
   async execute(input: changeStatusInput): Promise<commonOutput> {
      const { stageId, newProgress, date } = input
      await this._stagerepository.changeStageStatus({ stageId, newProgress, date })
      return ResponseHelper.success(StageSuccessMessage.STATUS_CHANGE)
   }
}