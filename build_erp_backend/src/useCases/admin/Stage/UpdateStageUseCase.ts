import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";
import { IStageRepository } from "../../../domain/repositories/IStageRepository";
import { fetchcostOutput, stageInputData } from "../../../domain/types/Stage";

export class UpdateStageUseCase {
   private stageRepository: IStageRepository
   private projectRepository : IprojectRepository
   constructor(stageRepository: IStageRepository,projectRepository : IprojectRepository) {
      this.stageRepository = stageRepository
      this.projectRepository = projectRepository
   }
   async execute(input: stageInputData): Promise<fetchcostOutput> {
      const { stages, projectId, startDate, endDate, cost } = input
      await this.stageRepository.DeleteDtageByproject(projectId)
      for(let char of stages){
         await this.stageRepository.stageDataSave(projectId,char) 
      }
      await this.projectRepository.SetCostInProject(projectId, startDate, endDate, cost);
      return{
         success:true,
         message:"stage updated successfully"
      }
   }
}