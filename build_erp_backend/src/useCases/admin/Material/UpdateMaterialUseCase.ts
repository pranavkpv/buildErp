import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { editMaterialInput } from "../../../Entities/Input-OutputEntities/MaterialEntities/material"
import { IUpdateMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/UpdateMaterialEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class UpdateMaterialUseCase implements IUpdateMaterialUseCase {
   private materialRepository: IMaterialRepository
   private projectStockRepository: IProjectStockRepository
   constructor(materialRepository: IMaterialRepository, projectStockRepository: IProjectStockRepository) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
   }

   async execute(input: editMaterialInput): Promise<commonOutput> {
      try {
         const { _id, material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input
         const existMaterial = await this.materialRepository.findMaterialInEdit(_id, material_name, category_id, brand_id)
         if (existMaterial) {
            return ResponseHelper.failure(ERROR_MESSAGE.MATERIAL.EXIST_LABOUR, HTTP_STATUS.CONFLICT)
         }
         await this.materialRepository.updateMaterialById(_id, material_name, category_id, brand_id, unit_id, unit_rate, stock)
         await this.projectStockRepository.deleteProjectStockByMaterialId(_id)
         for (let i = 0; i < projectWiseStock.length; i++) {
            const material_id = _id
            const projectStockId = projectWiseStock[i]._id
            const project_id = projectWiseStock[i].project
            const stock = projectWiseStock[i].stock
            await this.projectStockRepository.saveProjectStock(project_id, material_id, stock)
         }
         return ResponseHelper.success(SUCCESS_MESSAGE.MATERIAL.UPDATE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}
