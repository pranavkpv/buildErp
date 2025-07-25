import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity";

export class FetchMaterialUseCase implements IFetchMaterialUseCase {
   private materialRepository : IMaterialRepository
   constructor(materialRepository : IMaterialRepository){
      this.materialRepository = materialRepository
   }
   async execute():Promise<string[]>{
       const data = await this.materialRepository.findAllUniqueMaterial()
       return data
   }
}