import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository";

export class FetchBrandByMaterialName {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string): Promise<string[]> {
      const result = await this.materialRepository.findBrandByMaterialName(material_name)
      return result
   }
}