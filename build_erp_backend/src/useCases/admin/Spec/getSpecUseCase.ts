import { ISpecRepository } from "../../../domain/repositories/ISpecRepository";
import { Specification } from "../../../domain/types/specification";

export class getSpecUseCase{
   private specRepository:ISpecRepository
   constructor(specRepository:ISpecRepository){
      this.specRepository = specRepository
   }
   async execute():Promise<Specification[]>{
      const data = this.specRepository.fetchSpec()
      return data
   }
}