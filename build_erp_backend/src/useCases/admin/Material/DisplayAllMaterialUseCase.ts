import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository";




export class DisplayAllMaterialUseCase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(page:number,search:string): Promise<{getMaterialData:any[];totalPage:number }> {
      const {getMaterialData,totalPage} = await this.materialRepository.findAllMaterial(page, search)
      return {
         getMaterialData,
         totalPage
      }
   }
}



