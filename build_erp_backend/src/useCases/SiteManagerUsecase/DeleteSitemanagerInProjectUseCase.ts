import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { IDeleteSiteToProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerInProjectEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { SitemanagerSuccessMessage } from "../../Shared/Messages/Sitemanager.Message"


export class DeleteSiteToProjectUseCase implements IDeleteSiteToProjectUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(_id: string, sitemanager_id: string): Promise<commonOutput> {
      await this.projectRepository.removeSitemanagerInProject({ _id, siteManager_id: sitemanager_id })
      return ResponseHelper.success(SitemanagerSuccessMessage.DELETE)
   }
}