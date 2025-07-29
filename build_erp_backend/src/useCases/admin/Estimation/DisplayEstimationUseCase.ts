import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { estimationOutput, SpecData } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { IDisplayEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";


export class DisplayEstimationUseCase implements IDisplayEstimationUseCase {
   private estimationRepository: IEstimationRepository
   constructor(estimationRepository: IEstimationRepository) {
      this.estimationRepository = estimationRepository
   }
   async axecute(search: string, page: number): Promise<estimationOutput | commonOutput> {
      try {
         const { data, totalPage } = await this.estimationRepository.displaySpec(search, page)
         return {
            success: true,
            message: SUCCESS_MESSAGE.ESTIMATION.FETCH,
            status_code: HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}