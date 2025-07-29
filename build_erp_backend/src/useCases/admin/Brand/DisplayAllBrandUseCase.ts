import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { brandOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/brand";
import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository";
import { IDisplayAllBrandUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/DisplayAllBrandEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";




export class DisplayAllBrandUseCase implements IDisplayAllBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(page: number, search: string): Promise<brandOutput | commonOutput> {
      try {
         const { data, totalPage } = await this.brandRepository.findAllListBrand(page, search)
         return {
            success:true,
            message:SUCCESS_MESSAGE.BRAND.FETCH,
            status_code:HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}

