import { commonOutput } from "../../DTO/CommonEntities/common";
import { IDeleteEstimationUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DeleteEstimationEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IStageRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IStageRepository";
import { EstimationFailedMessage, EstimationSuccessMessage } from "../../Shared/Messages/Estimation.Message";


export class DeleteEstimationUseCase implements IDeleteEstimationUseCaseEntity {
   private estimationRepository: IEstimationRepositoryEntity
   private stageRepository: IStageRepositoryEntity
   constructor(estimationRepository: IEstimationRepositoryEntity, stageRepository: IStageRepositoryEntity) {
      this.estimationRepository = estimationRepository
      this.stageRepository = stageRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      const existStage = await this.stageRepository.findStageByprojectId(_id)
      if (existStage) {
         return ResponseHelper.conflictData(EstimationFailedMessage.USED_STAGE)
      }
      await this.estimationRepository.deleteEstimationById(_id)
      return ResponseHelper.success(EstimationSuccessMessage.DELETE)
   }
}