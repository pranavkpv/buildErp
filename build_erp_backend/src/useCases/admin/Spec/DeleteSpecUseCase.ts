import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IDeleteSpecUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/DeleteSpecEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";


export class DeleteSpecUseCase implements IDeleteSpecUseCase {
   private specRepository: ISpecRepository
   private estimationRepostory: IEstimationRepository
   constructor(specRepository: ISpecRepository, estimationRepostory: IEstimationRepository) {
      this.specRepository = specRepository
      this.estimationRepostory = estimationRepostory
   }
   async execute(_id: string): Promise<commonOutput> {
      try {
         const existEstimationBySpec = await this.estimationRepostory.findEstimationBySpecId(_id)
         if (existEstimationBySpec) {
            return ResponseHelper.failure(ERROR_MESSAGE.SPEC.USED_ESTIMATION, HTTP_STATUS.CONFLICT)
         }
         await this.specRepository.DeleteSpec(_id)
         return ResponseHelper.success(SUCCESS_MESSAGE.SPEC.DELETE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}