import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { addSite } from "../../DTO/SitemanagerEntities/addSite"
import { IAddSiteToProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { SitemanagerSuccessMessage } from "../../Shared/Messages/Sitemanager.Message"


export class AddSiteToProjectUseCase implements IAddSiteToProjectUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(input: addSite): Promise<commonOutput> {
      const { siteManager_id, selectedproject } = input
      for (let i = 0; i < selectedproject.length; i++) {
         await this.projectRepository.addSitemanagerToProject({ _id: selectedproject[i], siteManager_id })
      }
      return ResponseHelper.success(SitemanagerSuccessMessage.ADD)
   }
}






