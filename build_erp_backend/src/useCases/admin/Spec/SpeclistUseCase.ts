import { ISpecRepository } from "../../../domain/repositories/ISpecRepository";
import { Specification } from "../../../domain/types/specification";

export class SpeclistUseCase{
   private specRepository : ISpecRepository
   constructor(specRepository : ISpecRepository){
      this.specRepository = specRepository
   }
   async execute(page:number,search:string):Promise<{result:Specification[],totalPage:number}>{
     const result = await this.specRepository.fetchSpecList(page,search)
     return result 
   }
}