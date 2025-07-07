import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";
import { Project } from "../../../domain/types/project";

export class FetchProjectUseCase{
   private projectRepository:IprojectRepository
   constructor(projectRepository:IprojectRepository){
      this.projectRepository = projectRepository
   }
   async axecute():Promise<Project[]>{
      const data = await this.projectRepository.fetchProject()
      return data
   }
}