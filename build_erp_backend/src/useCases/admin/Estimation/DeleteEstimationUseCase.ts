import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";
import { outPutEstimation } from "../../../domain/types/estimation";

export class DeleteEstimationUseCase{
   private estimationRepository : IEstimationRepository
   constructor( estimationRepository : IEstimationRepository){
      this.estimationRepository = estimationRepository
   }
   async execute(input:{_id:string}):Promise<outPutEstimation>{
      const { _id } = input
       await this.estimationRepository.deleteEstimationById(_id)
       return {
         success:true,
         message:"seleted successFully"
       }
   }
}