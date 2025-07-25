import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { addBrandInput } from "../../../Entities/Input-OutputEntities/MaterialEntities/brand"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class SaveBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(input: addBrandInput): Promise<commonOutput> {
      const { brand_name } = input
      const existBrandData = await this.brandRepository.findBrandByName(brand_name)
      if (existBrandData) {
         return ResponseHelper.failure(ERROR_MESSAGE.BRAND.EXIST_BRAND, HTTP_STATUS.CONFLICT)
      }
      await this.brandRepository.saveBrand(brand_name)
      return ResponseHelper.success(SUCCESS_MESSAGE.BRAND.ADD,HTTP_STATUS.CREATED)
   }
}
