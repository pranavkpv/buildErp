import { commonOutput } from "../../DTO/CommonEntities/common";
import { rowData } from "../../DTO/EstimationEntities/estimation";
import { ISaveEstimationUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/SaveEstimationEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { EstimationSuccessMessage } from "../../Shared/Messages/Estimation.Message";


export class SaveEstimationUseCase implements ISaveEstimationUseCaseEntity {
   private estimationRepository: IEstimationRepositoryEntity
   constructor(estimationRepository: IEstimationRepositoryEntity) {
      this.estimationRepository = estimationRepository
   }
   async execute(input: { projectId: string, row: rowData[] }): Promise<commonOutput> {
      const projectId = input.projectId
      const specDetails = input.row
      await this.estimationRepository.saveEstimation(specDetails, projectId)
      return ResponseHelper.createdSuccess(EstimationSuccessMessage.ADD)
   }
}