import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { addMaterialInput } from "../../../Entities/Input-OutputEntities/MaterialEntities/material"
import { IAddMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/AddMaterialEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class AddMaterialUseCase implements IAddMaterialUseCase {
   private materialRepository: IMaterialRepository
   private projectStockRepository: IProjectStockRepository
   constructor(materialRepository: IMaterialRepository, projectStockRepository: IProjectStockRepository) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
   }
   async execute(input: addMaterialInput): Promise<commonOutput> {
      const { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input
      const existMaterial = await this.materialRepository.findMaterailWithNameCategoryBrand(material_name, category_id, brand_id)
      if (existMaterial) {
         return ResponseHelper.failure(ERROR_MESSAGE.MATERIAL.EXIST_LABOUR,HTTP_STATUS.CONFLICT)
      }
      
      const savedMaterialData = await this.materialRepository.saveMaterial(material_name, category_id, brand_id, unit_id, unit_rate, stock)
      for (let i = 0; i < projectWiseStock.length; i++) {
         const project_id = projectWiseStock[i].project
         const material_id = savedMaterialData._id
         const stock = projectWiseStock[i].stock
         await this.projectStockRepository.saveProjectStock(project_id, material_id, stock)
      }

      return ResponseHelper.success(SUCCESS_MESSAGE.MATERIAL.ADD,HTTP_STATUS.OK)
   }
}