import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { rowData } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IUpdateEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UpdateEstimationEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";

export class UpdateEstimationUsecase implements IUpdateEstimationUseCase {
   private estimationRepository: IEstimationRepository
   private stageRepository: IStageRepository
   constructor(estimationRepository: IEstimationRepository, stageRepository: IStageRepository) {
      this.estimationRepository = estimationRepository
      this.stageRepository = stageRepository
   }
   async execute(input: { projectId: string, row: rowData[] }): Promise<commonOutput> {
      try {
         const { projectId, row } = input
         const existStage = await this.stageRepository.findStageByprojectId(projectId)
         if (existStage.length>0) {
            return ResponseHelper.failure(ERROR_MESSAGE.ESTIMATION.USED_STAGE, HTTP_STATUS.CONFLICT)
         }

         await this.estimationRepository.deleteEstimationById(projectId)
         await this.estimationRepository.saveEstimation(row, projectId)
         return ResponseHelper.success(SUCCESS_MESSAGE.ESTIMATION.UPDATE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}