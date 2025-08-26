import { IBrandRepository } from "../../../domain/Entities/IRepository/IBrand"
import { IUpdateBrandUseCase } from "../../IUseCases/IBrand/IUpdateBrand"
import { brandFailedMessage, brandSuccessMessage } from "../../../Shared/Messages/Brand.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"


export class UpdateBrandUseCase implements IUpdateBrandUseCase {
   constructor(
      private _brandRepository: IBrandRepository
   ) { }
   async execute(_id: string, brand_name: string):
      Promise<commonOutput> {
      const existBrandData = await this._brandRepository.getBrandForEdit(_id, brand_name)
      if (existBrandData) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_EXIST)
      }
      await this._brandRepository.updateBrand(_id, brand_name)
      return ResponseHelper.success(brandSuccessMessage.UPDATE)
   }
}
