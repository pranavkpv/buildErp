import { IEstimationRepositoryEntity } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { commonOutput } from "../../dto/CommonEntities/common";
import { fetchcost } from "../../dto/ProjectEntities/Stage";
import { IFetchCostUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/StageUseCaseEntities/FetchCostEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";

export class FetchCostUseCase implements IFetchCostUseCaseEntity {
   private estimationReposiitory: IEstimationRepositoryEntity
   constructor(estimationReposiitory: IEstimationRepositoryEntity) {
      this.estimationReposiitory = estimationReposiitory
   }
   async execute(input: fetchcost): Promise<commonOutput> {
         const { projectId } = input
         const ExistEstimation = await this.estimationReposiitory.findEstimationByProjectId(projectId)
         if (ExistEstimation.length == 0) {
            return ResponseHelper.conflictData(StageFailedMessage.NOT_ESTIMATE)
         }
         let sum = 0
         for (let element of ExistEstimation) {
            sum += (element.quantity * element.unit_rate)
         }
         return ResponseHelper.success(StageSuccessMessage.FETCH_COST,sum)
   }
}