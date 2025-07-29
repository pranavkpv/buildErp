import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { stageInputData } from "../../../Entities/Input-OutputEntities/ProjectEntities/Stage";
import { IUpdateStageUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/UpdateStageEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class UpdateStageUseCase implements IUpdateStageUseCase {
   private stageRepository: IStageRepository
   private projectRepository: IprojectRepository
   constructor(stageRepository: IStageRepository, projectRepository: IprojectRepository) {
      this.stageRepository = stageRepository
      this.projectRepository = projectRepository
   }
   async execute(input: stageInputData): Promise<commonOutput> {
      try {
         const { projectId, stages, startDate, endDate, cost } = input
         const existUpdationOnstage = await this.stageRepository.findStageByprojectId(projectId)
         for(let element of existUpdationOnstage){
            if(element.progress > 0){
               return ResponseHelper.failure(ERROR_MESSAGE.STAGE.ALREADY_USED,HTTP_STATUS.CONFLICT)
            }
         }
         await this.stageRepository.DeleteDtageByproject(projectId)
         for (let char of stages) {
            await this.stageRepository.stageDataSave(projectId, char)
         }
         await this.projectRepository.SetCostInProject(projectId, startDate, endDate, cost);
         return ResponseHelper.success(SUCCESS_MESSAGE.STAGE.UPDATE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}