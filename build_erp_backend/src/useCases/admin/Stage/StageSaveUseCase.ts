import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";
import { IStageRepository } from "../../../domain/repositories/IStageRepository";
import { fetchcostOutput, stageInputData } from "../../../domain/types/Stage";

export class StageSaveUseCase {
   private projectRepository: IprojectRepository;
   private stageRepository: IStageRepository;

   constructor(projectRepository: IprojectRepository, stageRepository: IStageRepository) {
      this.projectRepository = projectRepository;
      this.stageRepository = stageRepository;
   }

   async execute(input: stageInputData): Promise<fetchcostOutput> {
      const { stages, projectId, startDate, endDate, cost } = input;
      const existStage = await this.projectRepository.findProjectWithCost(projectId);
      if(existStage && existStage.budgeted_cost){
         return{
            success:false,
            message:"stage set already completed this project"
         }
      }
      

      await this.projectRepository.SetCostInProject(projectId, startDate, endDate, cost);

      for (let element of stages) {
         await this.stageRepository.stageDataSave(projectId, element);
      }

      return {
         success: true,
         message: "Stages saved successfully"
      };
   }
}
