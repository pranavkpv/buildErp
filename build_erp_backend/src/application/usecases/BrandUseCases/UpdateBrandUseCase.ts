import { IBrandRepository } from "../../../domain/interfaces/Material-management/IBrandRepository"
import { IUpdateBrandUseCase } from "../../interfaces/useCase.Entity/Brand.UseCase.Entities/UpdateBrandEntity"
import { brandFailedMessage, brandSuccessMessage } from "../../../Shared/Messages/Brand.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"


export class UpdateBrandUseCase implements IUpdateBrandUseCase {
   constructor(
      private _brandRepository: IBrandRepository
   ) { }
   async execute(_id:string,brand_name:string): Promise<commonOutput> {
      const existBrandData = await this._brandRepository.findBrandInEdit(_id,brand_name)
      if (existBrandData) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_EXIST)
      }
      await this._brandRepository.updateBrandById(_id,brand_name)
      return ResponseHelper.success(brandSuccessMessage.UPDATE)
   }
}
