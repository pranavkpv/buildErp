import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchUserProjectUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchUserProjectUsecaseEntity";

export class FetchUserProjectUseCase implements IFetchUserProjectUseCase{
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute(user:string):Promise<IProjectModelEntity[]>{
      const projectList = await this.projectRepository.findProjectByUserId(user)
      return projectList
   }
}