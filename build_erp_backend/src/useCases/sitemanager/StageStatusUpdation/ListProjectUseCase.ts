import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IListProjectUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity";

export class ListProjectUseCase implements IListProjectUseCase {
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute(user:string):Promise<IProjectModelEntity[]>{
     const data = await this.projectRepository.findSitemanagerProject(user)
     return data
   }
}