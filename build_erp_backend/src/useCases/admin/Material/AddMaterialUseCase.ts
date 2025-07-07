import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository"
import { IProjectStockRepository } from "../../../domain/repositories/IProjectStockRepository"
import { addMaterialInput, outputMaterial } from "../../../domain/types/material"


export class AddMaterialUseCase {
   private materialRepository: IMaterialRepository
   private projectStockRepository: IProjectStockRepository
   constructor(materialRepository: IMaterialRepository, projectStockRepository: IProjectStockRepository) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
   }
   async execute(input: addMaterialInput): Promise<outputMaterial> {
      const { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input
      const existMaterial = await this.materialRepository.findMaterailWithNameCategoryBrand(material_name, category_id, brand_id)
      if (existMaterial) {
         return {
            success: false,
            message: "material already exist"
         }
      }
      
      const savedMaterialData = await this.materialRepository.saveMaterial(material_name, category_id, brand_id, unit_id, unit_rate, stock)
      for (let i = 0; i < projectWiseStock.length; i++) {
         const project_id = projectWiseStock[i].project
         const material_id = savedMaterialData._id
         const stock = projectWiseStock[i].stock
         await this.projectStockRepository.saveProjectStock(project_id, material_id, stock)
      }

      return {
         success: true,
         message: "material saved successfully"
      }

   }
}