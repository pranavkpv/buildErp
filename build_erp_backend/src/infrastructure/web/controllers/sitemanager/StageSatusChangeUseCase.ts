import { IStageRepository } from "../../../../domain/repositories/IStageRepository";
import { changeStatusInput, fetchcostOutput } from "../../../../domain/types/Stage";

export class StageStatusChangeUseCase{
   private stagerepository : IStageRepository
   constructor(stagerepository : IStageRepository){
      this.stagerepository = stagerepository
   }
   async execute(input:changeStatusInput):Promise<fetchcostOutput>{
     const {stageId,newStatus,date} = input
     await this.stagerepository.changeStageStatus(stageId,newStatus,date)
     return{
      success:true,
      message:"stage status changed successfully"
     }
   }
}