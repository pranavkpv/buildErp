import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IStageRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IStageRepository";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { stageInputData } from "../../DTO/ProjectEntities/Stage";
import { IStageSaveUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/StageSaveEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { StageFailedMessage, StageSuccessMessage } from "../../Shared/Messages/Stage.Message";

export class StageSaveUseCase implements IStageSaveUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity;
   private stageRepository: IStageRepositoryEntity;
   constructor(projectRepository: IprojectRepositoryEntity, stageRepository: IStageRepositoryEntity) {
      this.projectRepository = projectRepository;
      this.stageRepository = stageRepository;
   }

   async execute(input: stageInputData): Promise<commonOutput> {
      const { stages, projectId, startDate, endDate, cost } = input;
      const existStage = await this.projectRepository.findProjectWithCost(projectId);
      if (existStage && existStage.budgeted_cost) {
         return ResponseHelper.conflictData(StageFailedMessage.ALREADY_SET)
      }
      await this.projectRepository.SetCostInProject({ projectId, startDate, endDate, cost });
      for (let element of stages) {
         await this.stageRepository.stageDataSave(projectId, element);
      }
      return ResponseHelper.createdSuccess(StageSuccessMessage.ADD)
   }
}
