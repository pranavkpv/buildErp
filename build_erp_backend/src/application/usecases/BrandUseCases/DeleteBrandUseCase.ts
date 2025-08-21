import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IDeleteBrandUsecase } from "../../interfaces/useCase.Entity/Brand.UseCase.Entities/DeleteBrandEntity"
import { brandFailedMessage, brandSuccessMessage } from "../../../Shared/Messages/Brand.Message"
import { commonOutput } from "../../dto/common"
import { IBrandRepository } from "../../../domain/interfaces/Material-management/IBrandRepository"
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository"

export class DeleteBrandUseCase implements IDeleteBrandUsecase {
   constructor(
      private _brandRepository: IBrandRepository,
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const existBrand = await this._materialRepository.findMaterialByBrandId(_id)
      if (existBrand) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_USED)
      }
      await this._brandRepository.deleteBrandById(_id)
      return ResponseHelper.success(brandSuccessMessage.DELETE)
   }
}
