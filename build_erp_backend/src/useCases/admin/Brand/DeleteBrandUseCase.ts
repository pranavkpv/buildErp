import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository"
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IDeleteBrandUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/DeleteBrandEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"

export class DeleteBrandUseCase implements IDeleteBrandUsecase {
   private brandRepository: IBrandRepository
   private materialRepository: IMaterialRepository
   constructor(brandRepository: IBrandRepository, materialRepository: IMaterialRepository) {
      this.brandRepository = brandRepository
      this.materialRepository = materialRepository
   }
   async execute(_id:string): Promise<commonOutput> {
      const existBrand = await this.materialRepository.findMaterialByBrandId(_id)
      if (existBrand) {
         return ResponseHelper.failure(ERROR_MESSAGE.BRAND.ALREADY_USED,HTTP_STATUS.CONFLICT)
      }
      await this.brandRepository.deleteBrandById(_id)
      return ResponseHelper.success(SUCCESS_MESSAGE.BRAND.DELETE,HTTP_STATUS.OK)
   }
}
