import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository";
import { Material } from "../../../domain/types/material";

export class FetchMaterialUseCase{
   private materialRepository : IMaterialRepository
   constructor(materialRepository : IMaterialRepository){
      this.materialRepository = materialRepository
   }
   async execute():Promise<string[]>{
       const data = await this.materialRepository.findAllUniqueMaterial()
       return data
   }
}