import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFindmaterialSumUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity";


export class FindmaterialSumUseCase implements IFindmaterialSumUseCase{
   private materialRepository : IMaterialRepository
   constructor(materialRepository : IMaterialRepository){
      this.materialRepository = materialRepository
   }
   async execute(materials:{ material_id: string, quantity: number }[]):Promise<number>{
      const sum = await this.materialRepository.findSumOfMaterial(materials)
      return sum
   }
}