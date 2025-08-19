import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { EstimationFailedMessage, EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { IStageRepository } from "../../../domain/interfaces/Project-management/IStageRepository";
import { saveEstimationInput } from "../../entities/estimation.entity";
import { commonOutput } from "../../dto/common";
import { IUpdateEstimationUseCase } from "../../interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/UpdateEstimationEntity";

export class UpdateEstimationUsecase implements IUpdateEstimationUseCase {
   
   constructor(
   private estimationRepository: IEstimationRepository,
   private stageRepository: IStageRepository
) { }
   async execute(input: { projectId: string, row: saveEstimationInput[] }): Promise<commonOutput> {
      const { projectId, row } = input
      const existStage = await this.stageRepository.findStageByprojectId(projectId)
      if (existStage.length > 0) {
         return ResponseHelper.conflictData(EstimationFailedMessage.USED_STAGE)
      }
      await this.estimationRepository.deleteEstimationById(projectId)
      await this.estimationRepository.saveEstimation(row, projectId)
      return ResponseHelper.success(EstimationSuccessMessage.UPDATE)
   }
}