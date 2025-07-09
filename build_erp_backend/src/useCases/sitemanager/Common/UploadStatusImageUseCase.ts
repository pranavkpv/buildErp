import { IStageRepository } from "../../../domain/repositories/IStageRepository";

export class UploadStatusImageUseCase{
   private stageRepository : IStageRepository
   constructor(stageRepository : IStageRepository){
      this.stageRepository = stageRepository
   }
   async execute(url:string[]|string,_id:string,date:string){
         await this.stageRepository.uploadImageByStageId(_id,url,date)
         return {
            success:true,
            message:"Image uploaded successfully"
         }
   }
}