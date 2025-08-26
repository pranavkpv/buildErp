import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IDeleteBrandUsecase } from "../../IUseCases/IBrand/IDeleteBrand"
import { brandFailedMessage, brandSuccessMessage } from "../../../Shared/Messages/Brand.Message"
import { commonOutput } from "../../dto/common"
import { IBrandRepository } from "../../../domain/Entities/IRepository/IBrand"
import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial"

export class DeleteBrandUseCase implements IDeleteBrandUsecase {
   constructor(
      private _brandRepository: IBrandRepository,
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(_id: string):
      Promise<commonOutput> {
      const existBrand = await this._materialRepository.getMaterialByBrandId(_id)
      if (existBrand) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_USED)
      }
      await this._brandRepository.deleteBrand(_id)
      return ResponseHelper.success(brandSuccessMessage.DELETE)
   }
}
