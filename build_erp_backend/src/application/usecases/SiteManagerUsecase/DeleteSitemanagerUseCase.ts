import { ISitemanagerRepository } from "../../../domain/interfaces/Site-management/ISitemanagerRepository"
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { IDeleteSitemanagerUseCase } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerEntity"




export class DeleteSitemanagerUseCase implements IDeleteSitemanagerUseCase {
   constructor(
      private _sitemanagerRepository: ISitemanagerRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      await this._sitemanagerRepository.deleteSitemanager(_id)
      return ResponseHelper.success(SitemanagerSuccessMessage.DELETE)
   }

}
