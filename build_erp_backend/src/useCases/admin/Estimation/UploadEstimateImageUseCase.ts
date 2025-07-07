
import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";
import { outPutEstimation } from "../../../domain/types/estimation";

export class UploadEstimateImageUseCase{
  private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
    this.projectRepository = projectRepository
   }
   async execute(url:string,_id:string):Promise<outPutEstimation>{
       await this.projectRepository.UpdateEstimationImage(url,_id)
       return {
         success:true,
         message:"Image Uploaded successFully"
       }
   }
}