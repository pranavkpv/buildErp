import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { IUpdateSitemanagerUseCase } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/UpdateSitemanagerEntity"
import { editSitemanagerInput } from "../../entities/sitemanager.entity"
import { commonOutput } from "../../dto/common"
import { ISitemanagerRepository } from "../../../domain/interfaces/Site-management/ISitemanagerRepository"


export class UpdateSitemanagerUseCase implements IUpdateSitemanagerUseCase {
   constructor(
      private _sitemanagerRepository: ISitemanagerRepository
   ) { }
   async execute(input: editSitemanagerInput): Promise<commonOutput> {
      const { _id, username, email } = input
      const existData = await this._sitemanagerRepository.findSitemanagerInEdit(_id, email)
      if (existData) {
         return ResponseHelper.conflictData(SitemanagerFailedMessage.EXIST)
      }
      await this._sitemanagerRepository.updateSitemanager({ _id, username, email })
      return ResponseHelper.success(SitemanagerSuccessMessage.UPDATE)
   }
}

