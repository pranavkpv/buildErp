import { IBrandRepository } from "../../../domain/interfaces/Material-management/IBrandRepository"
import { brandFailedMessage, brandSuccessMessage } from "../../../Shared/Messages/Brand.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { ISaveBrandUseCase } from "../../interfaces/useCase.Entity/Brand.UseCase.Entities/SaveBrandEntity"


export class SaveBrandUseCase implements ISaveBrandUseCase {
   constructor(
      private brandRepository: IBrandRepository
   ) { }
   async execute(brand_name:string): Promise<commonOutput> {
      const existBrandData = await this.brandRepository.findBrandByName(brand_name)
      if (existBrandData) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_EXIST)
      }
      await this.brandRepository.saveBrand(brand_name)
      return ResponseHelper.createdSuccess(brandSuccessMessage.ADD)
   }
}
