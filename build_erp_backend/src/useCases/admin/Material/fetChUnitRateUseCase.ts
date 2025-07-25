import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchUnitRateUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity";
import { IMaterialModelEntity } from "../../../Entities/ModelEntities/Material.Entity";


export class FetchUnitRateUseCase implements IFetchUnitRateUseCase {
   private materialRepository :IMaterialRepository
   constructor(materialRepository :IMaterialRepository){
      this.materialRepository = materialRepository
   }
   async execute(material_name:string,brand_name:string,unit_name:string):Promise<IMaterialModelEntity | null>{
      const existMaterial = await this.materialRepository.findUnitRate(material_name,brand_name,unit_name)
      return existMaterial 
   }
}