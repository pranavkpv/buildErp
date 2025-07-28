import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { fetchcost } from "../../../Entities/Input-OutputEntities/ProjectEntities/Stage";
import { IFetchCostUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/FetchCostEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class FetchCostUseCase implements IFetchCostUseCase {
   private estimationReposiitory: IEstimationRepository
   constructor(estimationReposiitory: IEstimationRepository) {
      this.estimationReposiitory = estimationReposiitory
   }
   async execute(input: fetchcost): Promise<commonOutput> {
      try {
         const { projectId } = input
         const ExistEstimation = await this.estimationReposiitory.findEstimationByProjectId(projectId)
         if (ExistEstimation.length == 0) {
            return ResponseHelper.failure(ERROR_MESSAGE.STAGE.NOT_ESTIMATE, HTTP_STATUS.BAD_REQUEST)
         }
         let sum = 0
         for (let element of ExistEstimation) {
            sum += (element.quantity * element.unit_rate)
         }
         return ResponseHelper.success(sum, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}