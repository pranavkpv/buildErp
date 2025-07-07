import { ISpecRepository } from "../../../domain/repositories/ISpecRepository";
import { outputSpec } from "../../../domain/types/specification";

export class DeleteSpecUseCase{
   private specRepository:ISpecRepository
   constructor(specRepository:ISpecRepository){
      this.specRepository = specRepository
   }
   async execute(_id:string):Promise<outputSpec>{
       await this.specRepository.DeleteSpec(_id)
       return{
         success:true,
         message:"specification deleted successfully"
       }
   }
}