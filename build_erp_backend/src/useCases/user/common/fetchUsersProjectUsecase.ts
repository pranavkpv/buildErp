import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";

export class FetchUserProjectUseCase{
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute(user:string){
      const projectList = await this.projectRepository.findProjectByUserId(user)
      return projectList
   }
}