import { ISitemanagerRepository } from "../../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { editSitemanagerInput } from "../../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager"
import { IUpdateSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/UpdateSitemanagerEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class UpdateSitemanagerUseCase implements IUpdateSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(input: editSitemanagerInput): Promise<commonOutput> {
      const { _id, username, email } = input
      const existData = await this.SitemanagerRepository.findSitemanagerInEdit(_id, email)
      if (existData) {
         return ResponseHelper.failure(ERROR_MESSAGE.SITEMANAGER.EXIST,HTTP_STATUS.CONFLICT)
      }
      await this.SitemanagerRepository.updateSitemanager(_id, username, email)
      return ResponseHelper.success(SUCCESS_MESSAGE.SITEMANAGER.UPDATE,HTTP_STATUS.OK)
   }
}

