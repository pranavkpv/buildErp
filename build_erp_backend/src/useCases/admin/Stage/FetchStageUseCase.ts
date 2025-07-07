import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";
import { Project } from "../../../domain/types/project";

export class FetchStageUsecase{
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute():Promise<Project[] | []>{
       const stageSettedproject = await this.projectRepository.findStageSetProject()
       return stageSettedproject ? stageSettedproject : []
   }
}