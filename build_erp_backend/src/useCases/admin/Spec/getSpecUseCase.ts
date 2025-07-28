import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { IgetSpecUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity";
import { ISpecModelEntity } from "../../../Entities/ModelEntities/Spec.Entity";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";


export class getSpecUseCase implements IgetSpecUseCase {
   private specRepository: ISpecRepository
   constructor(specRepository: ISpecRepository) {
      this.specRepository = specRepository
   }
   async execute(): Promise<ISpecModelEntity[] | commonOutput> {
      try {
         const data = this.specRepository.fetchSpec()
         return data
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}