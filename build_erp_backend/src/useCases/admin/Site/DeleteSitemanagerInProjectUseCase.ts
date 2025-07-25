import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IDeleteSiteToProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerInProjectEntity"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"




export class DeleteSiteToProjectUseCase implements IDeleteSiteToProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(_id:string,sitemanager_id:string): Promise<commonOutput> {
      await this.projectRepository.removeSitemanagerInProject(_id, sitemanager_id)
      return ResponseHelper.success(SUCCESS_MESSAGE.SITE.DELETE,HTTP_STATUS.OK)
   }
}