import { IprojectRepositoryEntity } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IStageRepositoryEntity } from "../../../domain/interfaces/Project-management/IStageRepository";
import { commonOutput } from "../../dto/CommonEntities/common";
import { stageInputData } from "../../dto/ProjectEntities/Stage";
import { IUpdateStageUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/StageUseCaseEntities/UpdateStageEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";

export class UpdateStageUseCase implements IUpdateStageUseCaseEntity {
   private stageRepository: IStageRepositoryEntity
   private projectRepository: IprojectRepositoryEntity
   constructor(stageRepository: IStageRepositoryEntity, projectRepository: IprojectRepositoryEntity) {
      this.stageRepository = stageRepository
      this.projectRepository = projectRepository
   }
   async execute(input: stageInputData): Promise<commonOutput> {
      const { projectId, stages, startDate, endDate, cost } = input
      const existUpdationOnstage = await this.stageRepository.findStageByprojectId(projectId)
      for (let element of existUpdationOnstage) {
         if (element.progress > 0) {
            return ResponseHelper.conflictData(StageFailedMessage.ALREADY_USED)
         }
      }
      await this.stageRepository.DeleteDtageByproject(projectId)
      for (let char of stages) {
         await this.stageRepository.stageDataSave(projectId, char)
      }
      await this.projectRepository.SetCostInProject({ projectId, startDate, endDate, cost });
      return ResponseHelper.success(StageSuccessMessage.UPDATE)
   }
}