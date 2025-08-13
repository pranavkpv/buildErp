import { commonOutput } from "../../DTO/CommonEntities/common"
import { editMaterialInput } from "../../DTO/MaterialEntities/material"
import { IUpdateMaterialUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/UpdateMaterialEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IProjectStockRepositoryEntity } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../Shared/Messages/Material.Message"



export class UpdateMaterialUseCase implements IUpdateMaterialUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   private projectStockRepository: IProjectStockRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity, projectStockRepository: IProjectStockRepositoryEntity) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
   }

   async execute(input: editMaterialInput): Promise<commonOutput> {
      const { _id, material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input
      const existMaterial = await this.materialRepository.findMaterialInEdit({ _id, material_name, brand_id, category_id })
      if (existMaterial) {
         return ResponseHelper.conflictData(MaterialFailedMessage.EXIST)
      }
      await this.materialRepository.updateMaterialById({ _id, material_name, category_id, brand_id, unit_id, unit_rate, stock })
      await this.projectStockRepository.deleteProjectStockByMaterialId(_id)
      for (let i = 0; i < projectWiseStock.length; i++) {
         const material_id = _id
         const projectStockId = projectWiseStock[i]._id
         const project_id = projectWiseStock[i].project
         const stock = projectWiseStock[i].stock
         await this.projectStockRepository.saveProjectStock({ project_id, material_id, stock })
      }
      return ResponseHelper.success(MaterialSuccessMessage.UPDATE)
   }
}
