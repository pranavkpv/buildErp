import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { ISpeclistUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity";
import { ISpecModelEntity } from "../../../Entities/ModelEntities/Spec.Entity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { specOutput } from "../../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";


export class SpeclistUseCase implements ISpeclistUseCase {
   private specRepository: ISpecRepository
   constructor(specRepository: ISpecRepository) {
      this.specRepository = specRepository
   }
   async execute(page: number, search: string): Promise<specOutput | commonOutput> {
      try {
         const {result,totalPage} = await this.specRepository.fetchSpecList(page, search)
         return {
            success:true,
            message:SUCCESS_MESSAGE.SPEC.FETCH,
            status_code:HTTP_STATUS.OK,
            data : result,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}