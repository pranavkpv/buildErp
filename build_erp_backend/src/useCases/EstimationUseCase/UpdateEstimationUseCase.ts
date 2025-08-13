import { rowData } from "../../DTO/EstimationEntities/estimation";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { IUpdateEstimationUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UpdateEstimationEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IStageRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IStageRepository";
import { EstimationFailedMessage, EstimationSuccessMessage } from "../../Shared/Messages/Estimation.Message";

export class UpdateEstimationUsecase implements IUpdateEstimationUseCaseEntity {
   private estimationRepository: IEstimationRepositoryEntity
   private stageRepository: IStageRepositoryEntity
   constructor(estimationRepository: IEstimationRepositoryEntity, stageRepository: IStageRepositoryEntity) {
      this.estimationRepository = estimationRepository
      this.stageRepository = stageRepository
   }
   async execute(input: { projectId: string, row: rowData[] }): Promise<commonOutput> {
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