import { commonOutput } from "../../DTO/CommonEntities/common"
import { addMaterialInput } from "../../DTO/MaterialEntities/material"
import { IAddMaterialUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/AddMaterialEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IProjectStockRepositoryEntity } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../Shared/Messages/Material.Message"



export class AddMaterialUseCase implements IAddMaterialUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   private projectStockRepository: IProjectStockRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity, projectStockRepository: IProjectStockRepositoryEntity) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
   }
   async execute(input: addMaterialInput): Promise<commonOutput> {
      const { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input
      const existMaterial = await this.materialRepository.findMaterailWithNameCategoryBrand({ material_name, category_id, brand_id })
      if (existMaterial) {
         return ResponseHelper.conflictData(MaterialFailedMessage.EXIST)
      }
      const savedMaterialData = await this.materialRepository.saveMaterial({ material_name, category_id, brand_id, unit_id, unit_rate, stock })
      if (!projectWiseStock) return ResponseHelper.badRequest(MaterialFailedMessage.STOCK_MATCH)
      for (let i = 0; i < projectWiseStock.length; i++) {
         const project_id = projectWiseStock[i].project_id
         const material_id = savedMaterialData._id
         const stock = projectWiseStock[i].stock
         await this.projectStockRepository.saveProjectStock({ project_id, material_id, stock })
      }
      return ResponseHelper.createdSuccess(MaterialSuccessMessage.ADD)

   }
}