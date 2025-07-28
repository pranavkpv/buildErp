import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository";
import { IDisplayAllBrandUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/DisplayAllBrandEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";




export class DisplayAllBrandUseCase implements IDisplayAllBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(page: number, search: string): Promise<{ getBrandData: any[]; totalPage: number } | commonOutput> {
      try {
         const { getBrandData, totalPage } = await this.brandRepository.findAllListBrand(page, search)
         return {
            getBrandData,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}

