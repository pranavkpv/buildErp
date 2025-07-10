import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";
import { IStageRepository } from "../../../domain/repositories/IStageRepository";
import { outPutEstimation } from "../../../domain/types/estimation";

export class DeleteEstimationUseCase{
   private estimationRepository : IEstimationRepository
   private stageRepository : IStageRepository
   constructor( estimationRepository : IEstimationRepository,stageRepository : IStageRepository){
      this.estimationRepository = estimationRepository
      this.stageRepository = stageRepository
   }
   async execute(input:{_id:string}):Promise<outPutEstimation>{
      const { _id } = input
       const existStage = await this.stageRepository.findStageByprojectId(_id)
       if(existStage){
         return {
            success:false,
            message:"stage setting is completed"
         }
       }
       await this.estimationRepository.deleteEstimationById(_id)
       return {
         success:true,
         message:"Estimation deleted successfully"
       }
   }
}