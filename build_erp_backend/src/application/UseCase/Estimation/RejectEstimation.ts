import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { rejectEstimationInput } from "../../Entities/estimation.entity";
import { IRejectEstimationUseCase } from "../../IUseCases/IEstimation/IRejectEstimation";

export class RejectEstimationUsecase implements IRejectEstimationUseCase {
   constructor(
      private _projectRepository: IprojectRepository,
      private _estimationRepository: IEstimationRepository
   ) { }
   async execute(input: rejectEstimationInput): Promise<commonOutput> {
      const { reason, projectId } = input
      await this._projectRepository.updateEstimationStatus(false, projectId)
      await this._estimationRepository.updateRejectStatusAndReason(projectId, reason)
      return ResponseHelper.success(EstimationSuccessMessage.REJECT_SUCCESS)
   }
}