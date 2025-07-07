import { IprojectRepository } from "../../../domain/repositories/IProjectRepository";



export class DisplayAllProjectUseCase {
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
