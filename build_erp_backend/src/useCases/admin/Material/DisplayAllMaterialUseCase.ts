import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IDisplayAllMaterialUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity";




export class DisplayAllMaterialUseCase implements IDisplayAllMaterialUsecase {
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



