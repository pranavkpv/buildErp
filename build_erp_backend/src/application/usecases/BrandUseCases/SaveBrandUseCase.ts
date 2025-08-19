import { commonOutput } from "../../dto/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { inputBrand } from "../../dto/BrandEntities/Brand.Entity"
import { brandFailedMessage, brandSuccessMessage } from "../../../Shared/Messages/Brand.Message"
import { IBrandRepositoryEntity } from "../../../domain/interfaces/Material-management/IBrandRepository"



export class SaveBrandUseCase {
   private brandRepository: IBrandRepositoryEntity
   constructor(brandRepository: IBrandRepositoryEntity) {
      this.brandRepository = brandRepository
   }
   async execute(input: inputBrand): Promise<commonOutput> {
      const existBrandData = await this.brandRepository.findBrandByName(input)
      if (existBrandData) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_EXIST)
      }
      await this.brandRepository.saveBrand(input)
      return ResponseHelper.createdSuccess(brandSuccessMessage.ADD)
   }
}
