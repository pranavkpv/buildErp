import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository";

//here find the sum of material with material_id,quantity in estimation
export class FindmaterialSumUseCase{
   private materialRepository : IMaterialRepository
   constructor(materialRepository : IMaterialRepository){
      this.materialRepository = materialRepository
   }
   async execute(materials:{ material_id: string, quantity: number }[]){
      const sum = await this.materialRepository.findSumOfMaterial(materials)
      return sum
   }
}