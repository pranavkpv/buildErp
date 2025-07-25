import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchBrandByMaterialName } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity";

export class FetchBrandByMaterialName implements IFetchBrandByMaterialName {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string): Promise<string[]> {
      const result = await this.materialRepository.findBrandByMaterialName(material_name)
      return result
   }
}