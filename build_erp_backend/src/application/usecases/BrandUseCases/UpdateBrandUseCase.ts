import { inputBrand } from "../../dto/BrandEntities/Brand.Entity"
import { commonOutput } from "../../dto/CommonEntities/common"
import { IBrandRepositoryEntity } from "../../../domain/interfaces/Material-management/IBrandRepository"
import { IUpdateBrandUseCaseEntity } from "../../interfaces/useCase.Entity/Brand.UseCase.Entities/UpdateBrandEntity"
import { brandFailedMessage, brandSuccessMessage } from "../../../Shared/Messages/Brand.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"


export class UpdateBrandUseCase implements IUpdateBrandUseCaseEntity {
   private brandRepository: IBrandRepositoryEntity
   constructor(brandRepository: IBrandRepositoryEntity) {
      this.brandRepository = brandRepository
   }
   async execute(input: inputBrand): Promise<commonOutput> {
      const existBrandData = await this.brandRepository.findBrandInEdit(input)
      if (existBrandData) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_EXIST)
      }
      await this.brandRepository.updateBrandById(input)
      return ResponseHelper.success(brandSuccessMessage.UPDATE)
   }
}
