import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository"
import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository"
import { IProjectStockRepository } from "../../../domain/repositories/IProjectStockRepository"
import { ISpecRepository } from "../../../domain/repositories/ISpecRepository"
import { deleteMaterialInput, outputMaterial } from "../../../domain/types/material"


export class DeleteMaterialUseCase {
   private materialRepository: IMaterialRepository
   private projectStockRepository: IProjectStockRepository
   private specRepository : ISpecRepository
   constructor(materialRepository: IMaterialRepository, projectStockRepository: IProjectStockRepository,specRepository : ISpecRepository) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
      this.specRepository = specRepository
   }
   async execute(input: deleteMaterialInput): Promise<outputMaterial> {
      const { _id } = input
      const material_id = _id
      const existEstimation = await this.specRepository.findSpecByMaterialId(_id)
      if(existEstimation){
         return{
            success:false,
            message:"Material already used in specification registration"
         }
      }
      await this.materialRepository.deleteMaterialById(_id)
      await this.projectStockRepository.deleteProjectStockByMaterialId(material_id)
      return {
         success: true,
         message: "material deleted successfully"
      }
   }
}