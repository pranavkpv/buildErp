import { IBrandRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IBrandRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IDeleteBrandUsecaseEntity } from "../../Entities/useCaseEntities/Brand.UseCase.Entities/DeleteBrandEntity"
import { brandFailedMessage, brandSuccessMessage } from "../../Shared/Messages/Brand.Message"
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository"

export class DeleteBrandUseCase implements IDeleteBrandUsecaseEntity {
   constructor(private brandRepository: IBrandRepositoryEntity,
      private materialRepository: IMaterialRepositoryEntity) { }
   async execute(_id: string): Promise<commonOutput> {
      const existBrand = await this.materialRepository.findMaterialByBrandId(_id)
      if (existBrand) {
         return ResponseHelper.conflictData(brandFailedMessage.ALREADY_USED)
      }
      await this.brandRepository.deleteBrandById(_id)
      return ResponseHelper.success(brandSuccessMessage.DELETE)
   }
}
