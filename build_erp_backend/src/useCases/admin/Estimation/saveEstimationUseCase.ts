import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { rowData } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { ISaveEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/SaveEstimationEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";


export class SaveEstimationUseCase implements ISaveEstimationUseCase {
   private estimationRepository: IEstimationRepository
   constructor(estimationRepository: IEstimationRepository) {
      this.estimationRepository = estimationRepository
   }
   async execute(input: { projectId: string, row: rowData[] }): Promise<commonOutput> {
      try {
         const projectId = input.projectId
         const specDetails = input.row
         await this.estimationRepository.saveEstimation(specDetails, projectId)
         return ResponseHelper.success(SUCCESS_MESSAGE.ESTIMATION.ADD, HTTP_STATUS.CREATED)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}