import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository";
import { MaterialList } from "../../../domain/types/material";

export class FetchUnitRateUseCase{
   private materialRepository :IMaterialRepository
   constructor(materialRepository :IMaterialRepository){
      this.materialRepository = materialRepository
   }
   async execute(material_name:string,brand_name:string,unit_name:string):Promise<MaterialList | null>{
      const existMaterial = await this.materialRepository.findUnitRate(material_name,brand_name,unit_name)
      return existMaterial ? existMaterial:null
   }
}