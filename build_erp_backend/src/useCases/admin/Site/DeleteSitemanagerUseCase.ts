import { ISitemanagerRepository } from "../../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IDeleteSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class DeleteSitemanagerUseCase implements IDeleteSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
    async execute(_id:string):Promise<commonOutput> {
      await this.SitemanagerRepository.deleteSitemanager(_id)
      return ResponseHelper.success(SUCCESS_MESSAGE.SITEMANAGER.DELETE,HTTP_STATUS.OK)
    }

}
