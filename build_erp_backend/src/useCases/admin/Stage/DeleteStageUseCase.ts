import { IStageRepository } from "../../../domain/repositories/IStageRepository";

export class DeleteStageUseCase{
   private stageRepository:IStageRepository
   constructor(stageRepository:IStageRepository){
      this.stageRepository = stageRepository
   }
   async execute(input:{deleteId:string}){
      const {deleteId} = input
      await this.stageRepository.RemoveDateinProject(deleteId)
      await this.stageRepository.DeleteDtageByproject(deleteId)
      return{
         success:true,
         message:"stage deleted successfully"
      }
   }
}