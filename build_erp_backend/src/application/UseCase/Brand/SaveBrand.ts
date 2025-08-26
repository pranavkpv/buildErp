import { IBrandRepository } from "../../../domain/Entities/IRepository/IBrand"
import { brandFailedMessage, brandSuccessMessage } from "../../../Shared/Messages/Brand.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { ISaveBrandUseCase } from "../../IUseCases/IBrand/ISaveBrand"


export class SaveBrandUseCase implements ISaveBrandUseCase {
   constructor(
      private _brandRepository: IBrandRepository
   ) { }
   async execute(brand_name: string):
      Promise<commonOutput> {
      const existBrandData = await this._brandRepository.getBrandByName(brand_name)
      if (existBrandData) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_EXIST)
      }
      await this._brandRepository.createBrand(brand_name)
      return ResponseHelper.createdSuccess(brandSuccessMessage.ADD)
   }
}
