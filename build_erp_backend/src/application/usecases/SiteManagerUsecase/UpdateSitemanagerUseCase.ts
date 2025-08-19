import { ISitemanagerRepositoryEntity } from "../../../domain/interfaces/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../dto/CommonEntities/common"
import { editSitemanagerInput } from "../../dto/SitemanagerEntities/sitemanager"
import { IUpdateSitemanagerUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/UpdateSitemanagerEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"


export class UpdateSitemanagerUseCase implements IUpdateSitemanagerUseCaseEntity {
   private SitemanagerRepository: ISitemanagerRepositoryEntity
   constructor(SitemanagerRepository: ISitemanagerRepositoryEntity) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(input: editSitemanagerInput): Promise<commonOutput> {
      const { _id, username, email } = input
      const existData = await this.SitemanagerRepository.findSitemanagerInEdit(_id, email)
      if (existData) {
         return ResponseHelper.conflictData(SitemanagerFailedMessage.EXIST)
      }
      await this.SitemanagerRepository.updateSitemanager({ _id, username, email })
      return ResponseHelper.success(SitemanagerSuccessMessage.UPDATE)
   }
}

