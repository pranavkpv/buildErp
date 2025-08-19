import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { EstimationFailedMessage, EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { IDeleteEstimationUseCase } from "../../interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/DeleteEstimationEntity";
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { IStageRepository } from "../../../domain/interfaces/Project-management/IStageRepository";
import { commonOutput } from "../../dto/common";


export class DeleteEstimationUseCase implements IDeleteEstimationUseCase {

   constructor(
      private _estimationRepository: IEstimationRepository,
      private _stageRepository: IStageRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const existStage = await this._stageRepository.findStageByprojectId(_id)
      if (existStage) {
         return ResponseHelper.conflictData(EstimationFailedMessage.USED_STAGE)
      }
      await this._estimationRepository.deleteEstimationById(_id)
      return ResponseHelper.success(EstimationSuccessMessage.DELETE)
   }
}