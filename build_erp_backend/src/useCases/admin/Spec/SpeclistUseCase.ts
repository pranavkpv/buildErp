import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { ISpeclistUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity";
import { ISpecModelEntity } from "../../../Entities/ModelEntities/Spec.Entity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";


export class SpeclistUseCase implements ISpeclistUseCase {
   private specRepository: ISpecRepository
   constructor(specRepository: ISpecRepository) {
      this.specRepository = specRepository
   }
   async execute(page: number, search: string): Promise<{ result: any[], totalPage: number } | commonOutput> {
      try {
         const result = await this.specRepository.fetchSpecList(page, search)
         return result
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}