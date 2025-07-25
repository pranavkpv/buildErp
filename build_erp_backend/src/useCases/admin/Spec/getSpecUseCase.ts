import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { IgetSpecUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity";
import { ISpecModelEntity } from "../../../Entities/ModelEntities/Spec.Entity";


export class getSpecUseCase implements IgetSpecUseCase{
   private specRepository:ISpecRepository
   constructor(specRepository:ISpecRepository){
      this.specRepository = specRepository
   }
   async execute():Promise<ISpecModelEntity[]>{
      const data = this.specRepository.fetchSpec()
      return data
   }
}