import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchMaterialByMaterialName } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity";

export class FetchMaterialByMaterialName implements IFetchMaterialByMaterialName {
   private materialRepository:IMaterialRepository
   constructor(materialRepository:IMaterialRepository){
      this.materialRepository = materialRepository
   }
   async execute(material_name:string):Promise<string[]>{
      const result = await this.materialRepository.findUnitByMaterialName(material_name)
      return result

   }
}