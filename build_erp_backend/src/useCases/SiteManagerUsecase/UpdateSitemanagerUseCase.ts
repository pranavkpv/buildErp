import { ISitemanagerRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { editSitemanagerInput } from "../../DTO/SitemanagerEntities/sitemanager"
import { IUpdateSitemanagerUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/UpdateSitemanagerEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../Shared/Messages/Sitemanager.Message"


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

