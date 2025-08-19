import { ISitemanagerRepositoryEntity } from "../../../domain/interfaces/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../dto/CommonEntities/common"
import { IDeleteSitemanagerUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"



export class DeleteSitemanagerUseCase implements IDeleteSitemanagerUseCaseEntity {
   private SitemanagerRepository: ISitemanagerRepositoryEntity
   constructor(SitemanagerRepository: ISitemanagerRepositoryEntity) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      await this.SitemanagerRepository.deleteSitemanager(_id)
      return ResponseHelper.success(SitemanagerSuccessMessage.DELETE)
   }

}
