import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IDisplayAllProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity";



export class DisplayAllProjectUseCase implements IDisplayAllProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(page:number,search:string): Promise<{getProjectListData:any[];totalPage:number }> {
       const { getProjectListData, totalPage } = await this.projectRepository.findAllProjectWithUser(page, search);
      return {
         getProjectListData,
         totalPage
      };
   }
}
