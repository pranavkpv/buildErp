import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { IStageSaveUseCase } from "../../interfaces/AdminUseCaseEntities/StageUseCaseEntities/StageSaveEntity";
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IStageRepository } from "../../../domain/interfaces/Project-management/IStageRepository";
import { stageInputData } from "../../entities/stage.entity";
import { commonOutput } from "../../dto/common";

export class StageSaveUseCase implements IStageSaveUseCase {
   constructor(
      private _projectRepository: IprojectRepository,
      private _stageRepository: IStageRepository
   ) { }
   async execute(input: stageInputData): Promise<commonOutput> {
      const { stages, projectId, startDate, endDate, cost } = input;
      const existStage = await this._projectRepository.findProjectWithCost(projectId);
      if (existStage && existStage.budgeted_cost) {
         return ResponseHelper.conflictData(StageFailedMessage.ALREADY_SET)
      }
      await this._projectRepository.SetCostInProject({ projectId, startDate, endDate, cost });
      for (let element of stages) {
         await this._stageRepository.stageDataSave(projectId, element);
      }
      return ResponseHelper.createdSuccess(StageSuccessMessage.ADD)
   }
}
