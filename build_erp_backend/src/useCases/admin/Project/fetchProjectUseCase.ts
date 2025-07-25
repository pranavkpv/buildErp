import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { Project } from "../../../Entities/Input-OutputEntities/ProjectEntities/project";
import { IFetchProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity";
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";

export class FetchProjectUseCase implements IFetchProjectUseCase {
   private projectRepository:IprojectRepository
   constructor(projectRepository:IprojectRepository){
      this.projectRepository = projectRepository
   }
   async axecute():Promise<IProjectModelEntity[]>{
      const data = await this.projectRepository.fetchProject()
      return data
   }
}