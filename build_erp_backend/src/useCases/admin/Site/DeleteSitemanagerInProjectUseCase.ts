import { IprojectRepository } from "../../../domain/repositories/IProjectRepository"
import { deletSiteTo } from "../../../domain/types/addSite"
import { outputProject } from "../../../domain/types/project"


export class DeleteSiteToProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: deletSiteTo): Promise<outputProject> {
      console.log(input)
      const { _id, sitemanager_id } = input
      await this.projectRepository.removeSitemanagerInProject(_id, sitemanager_id)
      return {
         success: true,
         message: "sitemanager deleted successfully"
      }

   }
}