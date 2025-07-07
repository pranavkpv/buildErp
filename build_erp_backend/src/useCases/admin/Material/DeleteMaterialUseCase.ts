import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository"
import { IProjectStockRepository } from "../../../domain/repositories/IProjectStockRepository"
import { deleteMaterialInput, outputMaterial } from "../../../domain/types/material"


export class DeleteMaterialUseCase {
   private materialRepository: IMaterialRepository
   private projectStockRepository: IProjectStockRepository
   constructor(materialRepository: IMaterialRepository, projectStockRepository: IProjectStockRepository) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
   }
   async execute(input: deleteMaterialInput): Promise<outputMaterial> {
      const { _id } = input
      const material_id = _id
      await this.materialRepository.deleteMaterialById(_id)
      await this.projectStockRepository.deleteProjectStockByMaterialId(material_id)
      return {
         success: true,
         message: "material deleted successfully"
      }
   }
}