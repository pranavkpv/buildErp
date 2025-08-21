
import { IAddMaterialUseCase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/AddMaterialEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { addMaterialInput } from "../../entities/material.entity"
import { commonOutput } from "../../dto/common"



export class AddMaterialUseCase implements IAddMaterialUseCase {

   constructor(
      private _materialRepository: IMaterialRepository,
      private _projectStockRepository: IProjectStockRepository
   ) { }
   async execute(input: addMaterialInput): Promise<commonOutput> {
      const { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input
      const existMaterial = await this._materialRepository.findMaterailWithNameCategoryBrand({ material_name, category_id, brand_id })
      if (existMaterial) {
         return ResponseHelper.conflictData(MaterialFailedMessage.EXIST)
      }
      const savedMaterialData = await this._materialRepository.saveMaterial({ material_name, category_id, brand_id, unit_id, unit_rate, stock })
      if (!projectWiseStock) return ResponseHelper.badRequest(MaterialFailedMessage.STOCK_MATCH)
      for (let i = 0; i < projectWiseStock.length; i++) {
         const project_id = projectWiseStock[i].project
         const material_id = savedMaterialData._id
         const stock = projectWiseStock[i].stock
         await this._projectStockRepository.saveProjectStock({ project_id, material_id, stock })
      }
      return ResponseHelper.createdSuccess(MaterialSuccessMessage.ADD)

   }
}