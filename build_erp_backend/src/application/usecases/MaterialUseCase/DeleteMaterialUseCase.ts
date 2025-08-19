import { commonOutput } from "../../dto/CommonEntities/common"
import { IDeleteMaterialUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DeleteMaterialEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { IProjectStockRepositoryEntity } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { ISpecRepositoryEntity } from "../../../domain/interfaces/Estimation-management/ISpecRepository"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"


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