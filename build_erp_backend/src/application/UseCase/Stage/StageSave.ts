import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { IStageSaveUseCase } from "../../IUseCases/IStage/IStageSave";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { IStageRepository } from "../../../domain/Entities/IRepository/IStage";
import { stageInputData } from "../../Entities/stage.entity";
import { commonOutput } from "../../dto/common";

export class StageSaveUseCase implements IStageSaveUseCase {
   constructor(
      private _projectRepository: IprojectRepository,
      private _stageRepository: IStageRepository
   ) { }
   async execute(input: stageInputData): Promise<commonOutput> {
      const { stages, projectId, startDate, endDate, cost } = input;
      const existStage = await this._projectRepository.getProjectWithCost(projectId)
      if (existStage && existStage.budgeted_cost) {
         return ResponseHelper.conflictData(StageFailedMessage.ALREADY_SET)
      }
      await this._projectRepository.setProjectCost({ projectId, startDate, endDate, cost })
      for (let element of stages) {
         await this._stageRepository.stageDataSave(projectId, element);
      }
      return ResponseHelper.createdSuccess(StageSuccessMessage.ADD)
   }
}
