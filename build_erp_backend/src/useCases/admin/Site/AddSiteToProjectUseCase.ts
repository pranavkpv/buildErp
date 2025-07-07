import { IprojectRepository } from "../../../domain/repositories/IProjectRepository"
import { addSite } from "../../../domain/types/addSite"
import { outputProject } from "../../../domain/types/project"



export class AddSiteToProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: addSite): Promise<outputProject> {
      console.log(input)
      const { siteManager_id, selectedproject } = input
      for (let i = 0; i < selectedproject.length; i++) {
         await this.projectRepository.addSitemanagerToProject(selectedproject[i], siteManager_id)
      }
      return {
         success: true,
         message: "sitemanager added the project successfully"
      }
   }
}






