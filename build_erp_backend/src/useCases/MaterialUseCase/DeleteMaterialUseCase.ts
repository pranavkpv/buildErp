import { commonOutput } from "../../DTO/CommonEntities/common"
import { IDeleteMaterialUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DeleteMaterialEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IProjectStockRepositoryEntity } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { ISpecRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../Shared/Messages/Material.Message"


export class DeleteMaterialUseCase implements IDeleteMaterialUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   private projectStockRepository: IProjectStockRepositoryEntity
   private specRepository: ISpecRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity, projectStockRepository: IProjectStockRepositoryEntity, specRepository: ISpecRepositoryEntity) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
      this.specRepository = specRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      const material_id = _id
      const existEstimation = await this.specRepository.findSpecByMaterialId(_id)
      if (existEstimation) {
         return ResponseHelper.conflictData(MaterialFailedMessage.USED_SPEC)
      }
      await this.materialRepository.deleteMaterialById(_id)
      await this.projectStockRepository.deleteProjectStockByMaterialId(material_id)
      return ResponseHelper.success(MaterialSuccessMessage.DELETE)
   }
}