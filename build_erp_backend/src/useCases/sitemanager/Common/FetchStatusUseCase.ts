import { IStageRepository } from "../../../domain/repositories/IStageRepository";
import { fetchcost, fetchcostOutput, Stage, stageData } from "../../../domain/types/Stage";

export class FetchStatusUseCase {
   private stageRepository: IStageRepository
   constructor(stageRepository: IStageRepository) {
      this.stageRepository = stageRepository
   }
   async execute(input: fetchcost): Promise<fetchcostOutput> {
      const { projectId } = input
      const data = await this.stageRepository.findStageByprojectId(projectId)
      if (data.length == 0) {
         return {
            success: false,
            message: "shouldn't set the stage of this project"
         }
      }
      return {
         success:true,
         message:data
      }
   }
}