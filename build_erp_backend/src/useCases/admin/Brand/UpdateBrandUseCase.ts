import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { editBrandInput } from "../../../Entities/Input-OutputEntities/MaterialEntities/brand"
import { IUpdateBrandUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/UpdateBrandEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class UpdateBrandUseCase implements IUpdateBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(input: editBrandInput): Promise<commonOutput> {
      const { _id, brand_name } = input
      const existBrandData = await this.brandRepository.findBrandInEdit(_id, brand_name)
      if (existBrandData) {
         return ResponseHelper.failure(ERROR_MESSAGE.BRAND.EXIST_BRAND,HTTP_STATUS.CONFLICT)
      }
      await this.brandRepository.updateBrandById(_id, brand_name)
      return ResponseHelper.success(SUCCESS_MESSAGE.BRAND.UPDATE,HTTP_STATUS.OK)
   }
}
