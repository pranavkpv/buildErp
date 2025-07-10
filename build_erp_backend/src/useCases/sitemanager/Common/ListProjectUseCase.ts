import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";

export class ListProjectUseCase{
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute(user:string){
     const data = await this.projectRepository.findSitemanagerProject(user)
     return data
   }
}