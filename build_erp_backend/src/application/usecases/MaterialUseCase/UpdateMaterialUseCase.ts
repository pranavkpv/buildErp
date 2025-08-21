import { IUpdateMaterialUseCase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/UpdateMaterialEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { editMaterialInput } from "../../entities/material.entity"
import { commonOutput } from "../../dto/common"



export class UpdateMaterialUseCase implements IUpdateMaterialUseCase {

   constructor(
      private materialRepository: IMaterialRepository,
      private projectStockRepository: IProjectStockRepository
   ) { }

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
         const project_id = projectWiseStock[i].project
         const stock = projectWiseStock[i].stock
         await this.projectStockRepository.saveProjectStock({ project_id, material_id, stock })
      }
      return ResponseHelper.success(MaterialSuccessMessage.UPDATE)
   }
}
