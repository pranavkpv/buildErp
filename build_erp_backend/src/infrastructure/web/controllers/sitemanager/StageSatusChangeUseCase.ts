import { IStageRepository } from "../../../../domain/repositories/IStageRepository";
import { changeStatusInput, fetchcostOutput } from "../../../../domain/types/Stage";

export class StageStatusChangeUseCase{
   private stagerepository : IStageRepository
   constructor(stagerepository : IStageRepository){
      this.stagerepository = stagerepository
   }
   async execute(input:changeStatusInput):Promise<fetchcostOutput>{
     const {stageId,newProgress,date} = input
     await this.stagerepository.changeStageStatus(stageId,newProgress,date)
     return{
      success:true,
      message:"stage status changed successfully"
     }
   }
}