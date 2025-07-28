import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { addSite } from "../../../Entities/Input-OutputEntities/SitemanagerEntities/addSite"
import { IAddSiteToProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"




export class AddSiteToProjectUseCase implements IAddSiteToProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: addSite): Promise<commonOutput> {
      try {
         const { siteManager_id, selectedproject } = input
         for (let i = 0; i < selectedproject.length; i++) {
            await this.projectRepository.addSitemanagerToProject(selectedproject[i], siteManager_id)
         }
         return ResponseHelper.success(SUCCESS_MESSAGE.SITE.ADD, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}






