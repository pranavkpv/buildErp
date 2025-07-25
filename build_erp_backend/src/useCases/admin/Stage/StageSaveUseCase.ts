import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { stageInputData } from "../../../Entities/Input-OutputEntities/ProjectEntities/Stage";
import { IStageSaveUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/StageSaveEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class StageSaveUseCase implements IStageSaveUseCase {
   private projectRepository: IprojectRepository;
   private stageRepository: IStageRepository;

   constructor(projectRepository: IprojectRepository, stageRepository: IStageRepository) {
      this.projectRepository = projectRepository;
      this.stageRepository = stageRepository;
   }

   async execute(input: stageInputData): Promise<commonOutput> {
      const { stages, projectId, startDate, endDate, cost } = input;
      const existStage = await this.projectRepository.findProjectWithCost(projectId);
      if (existStage && existStage.budgeted_cost) {
         return ResponseHelper.failure(ERROR_MESSAGE.STAGE.ALREADY_SET, HTTP_STATUS.CONFLICT)
      }
      await this.projectRepository.SetCostInProject(projectId, startDate, endDate, cost);

      for (let element of stages) {
         await this.stageRepository.stageDataSave(projectId, element);
      }
      return ResponseHelper.success(SUCCESS_MESSAGE.STAGE.ADD, HTTP_STATUS.CREATED)
   }
}
