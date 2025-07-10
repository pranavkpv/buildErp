import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";
import { ISpecRepository } from "../../../domain/repositories/ISpecRepository";
import { outputSpec } from "../../../domain/types/specification";

export class DeleteSpecUseCase{
   private specRepository:ISpecRepository
   private estimationRepostory : IEstimationRepository
   constructor(specRepository:ISpecRepository , estimationRepostory : IEstimationRepository){
      this.specRepository = specRepository
      this.estimationRepostory = estimationRepostory
   }
   async execute(_id:string):Promise<outputSpec>{
      const existEstimationBySpec = await this.estimationRepostory.findEstimationBySpecId(_id)
      if(existEstimationBySpec){
         return {
            success:false,
            message:"this spec is already used in estimation"
         }
      }
       await this.specRepository.DeleteSpec(_id)
       return{
         success:true,
         message:"specification deleted successfully"
       }
   }
}