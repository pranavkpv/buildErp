import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { ISpeclistUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity";
import { ISpecModelEntity } from "../../../Entities/ModelEntities/Spec.Entity";


export class SpeclistUseCase implements ISpeclistUseCase {
   private specRepository : ISpecRepository
   constructor(specRepository : ISpecRepository){
      this.specRepository = specRepository
   }
   async execute(page:number,search:string):Promise<{result:any[],totalPage:number}>{
     const result = await this.specRepository.fetchSpecList(page,search)
     return result 
   }
}