import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { IgetSpecUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { specOutput } from "../../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";


export class getSpecUseCase implements IgetSpecUseCase {
   private specRepository: ISpecRepository
   constructor(specRepository: ISpecRepository) {
      this.specRepository = specRepository
   }
   async execute(): Promise<specOutput | commonOutput> {
      try {
         const data = await this.specRepository.fetchSpec()
         return {
            success:true,
            message:SUCCESS_MESSAGE.SPEC.FETCH,
            status_code:HTTP_STATUS.OK,
            data,
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}