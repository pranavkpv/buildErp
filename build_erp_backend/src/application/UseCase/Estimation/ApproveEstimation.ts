import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IApproveEstimationUseCase } from "../../IUseCases/IEstimation/IApproveEstimation";

export class ApproveEstimationUseCase implements IApproveEstimationUseCase {
   constructor(
      private _estimationRepository: IEstimationRepository
   ) { }
   async execute(projectId: string): Promise<commonOutput> {
      await this._estimationRepository.updateEstimationStatus(true,projectId)
      return ResponseHelper.success(EstimationSuccessMessage.APPROVE_SUCCESS)
   }
}