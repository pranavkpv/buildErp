import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchStatusBaseProjectUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchStatusBaseProjectUseCaseEntity";

export class FetchStatusBaseProjectUseCase implements IFetchStatusBaseProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(status: string,search:string,area:number,page:number): Promise<{data:IProjectModelEntity[],totalPage:number,areas:number[]}> {
      const statusBaseProject = await this.projectRepository.findStatusBaseProject(status,search,area,page)
      return statusBaseProject
   }
}