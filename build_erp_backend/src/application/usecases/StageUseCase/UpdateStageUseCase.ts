import { IUpdateStageUseCase } from "../../interfaces/AdminUseCaseEntities/StageUseCaseEntities/UpdateStageEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { IStageRepository } from "../../../domain/interfaces/Project-management/IStageRepository";
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { stageInputData } from "../../entities/stage.entity";
import { commonOutput } from "../../dto/common";

export class UpdateStageUseCase implements IUpdateStageUseCase {
   constructor(
      private _stageRepository: IStageRepository,
      private _projectRepository: IprojectRepository
   ) { }
   async execute(input: stageInputData): Promise<commonOutput> {
      const { projectId, stages, startDate, endDate, cost } = input
      const existUpdationOnstage = await this._stageRepository.findStageByprojectId(projectId)
      for (let element of existUpdationOnstage) {
         if (element.progress > 0) {
            return ResponseHelper.conflictData(StageFailedMessage.ALREADY_USED)
         }
      }
      await this._stageRepository.DeleteStageByproject(projectId)
      for (let char of stages) {
         await this._stageRepository.stageDataSave(projectId, char)
      }
      await this._projectRepository.SetCostInProject({ projectId, startDate, endDate, cost });
      return ResponseHelper.success(StageSuccessMessage.UPDATE)
   }
}