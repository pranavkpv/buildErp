import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IApproveEstimationUseCase } from "../../IUseCases/IEstimation/IApproveEstimation";

export class ApproveEstimationUseCase implements IApproveEstimationUseCase {
   constructor(
      private _estimationRepository: IEstimationRepository,
      private _projectRepository: IprojectRepository
   ) { }
   async execute(projectId: string): Promise<commonOutput> {
      await this._estimationRepository.updateEstimationStatus(true, projectId)
      await this._projectRepository.updateProjectStatus(projectId, "processing")
      return ResponseHelper.success(EstimationSuccessMessage.APPROVE_SUCCESS)
   }
}