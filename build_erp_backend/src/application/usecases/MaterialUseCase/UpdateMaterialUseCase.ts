import { commonOutput } from "../../dto/CommonEntities/common"
import { editMaterialInput } from "../../dto/MaterialEntities/material"
import { IUpdateMaterialUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/UpdateMaterialEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { IProjectStockRepositoryEntity } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"



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
