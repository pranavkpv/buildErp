import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { SpecData } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { IDisplayEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";


export class DisplayEstimationUseCase implements IDisplayEstimationUseCase {
   private estimationRepository: IEstimationRepository
   constructor(estimationRepository: IEstimationRepository) {
      this.estimationRepository = estimationRepository
   }
   async axecute(search: string, page: number): Promise<{ data: SpecData[], totalPage: number } | commonOutput> {
      try {
         const result = await this.estimationRepository.displaySpec(search, page)
         return result
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}