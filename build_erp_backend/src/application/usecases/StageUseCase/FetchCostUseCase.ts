import { IFetchCostUseCase } from "../../interfaces/AdminUseCaseEntities/StageUseCaseEntities/FetchCostEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { commonOutput } from "../../dto/common";

export class FetchCostUseCase implements IFetchCostUseCase {

   constructor(
      private _estimationReposiitory: IEstimationRepository
   ) { }
   async execute(projectId: string): Promise<commonOutput<number> | commonOutput> {
      const ExistEstimation = await this._estimationReposiitory.findEstimationByProjectId(projectId)
      if (ExistEstimation.length == 0) {
         return ResponseHelper.conflictData(StageFailedMessage.NOT_ESTIMATE)
      }
      let sum = 0
      for (let element of ExistEstimation) {
         sum += (element.quantity * element.unit_rate)
      }
      return ResponseHelper.success(StageSuccessMessage.FETCH_COST, sum)
   }
}