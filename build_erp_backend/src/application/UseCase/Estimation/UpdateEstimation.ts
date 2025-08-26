import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { EstimationFailedMessage, EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { IStageRepository } from "../../../domain/Entities/IRepository/IStage";
import { saveEstimationInput } from "../../Entities/estimation.entity";
import { commonOutput } from "../../dto/common";
import { IUpdateEstimationUseCase } from "../../IUseCases/IEstimation/IUpdateEstimation";

export class UpdateEstimationUsecase implements IUpdateEstimationUseCase {

   constructor(
      private _estimationRepository: IEstimationRepository,
      private _stageRepository: IStageRepository
   ) { }
   async execute(input: { projectId: string, row: saveEstimationInput[] }):
      Promise<commonOutput> {
      const { projectId, row } = input
      const existStage = await this._stageRepository.findStageByprojectId(projectId)
      if (existStage.length > 0) {
         return ResponseHelper.conflictData(EstimationFailedMessage.USED_STAGE)
      }
      await this._estimationRepository.deleteEstimationsByProjectId(projectId)
      await this._estimationRepository.createEstimation(row, projectId)
      return ResponseHelper.success(EstimationSuccessMessage.UPDATE)
   }
}