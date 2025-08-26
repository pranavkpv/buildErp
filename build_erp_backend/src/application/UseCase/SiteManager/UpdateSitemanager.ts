import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { IUpdateSitemanagerUseCase } from "../../IUseCases/ISitemanager/IUpdateSitemanager"
import { editSitemanagerInput } from "../../Entities/sitemanager.entity"
import { commonOutput } from "../../dto/common"
import { ISitemanagerRepository } from "../../../domain/Entities/IRepository/ISitemanager"


export class UpdateSitemanagerUseCase implements IUpdateSitemanagerUseCase {
   constructor(
      private _sitemanagerRepository: ISitemanagerRepository
   ) { }
   async execute(input: editSitemanagerInput): Promise<commonOutput> {
      const { _id, username, email } = input
      const existData = await this._sitemanagerRepository.getSitemanagerForEdit(_id, email)
      if (existData) {
         return ResponseHelper.conflictData(SitemanagerFailedMessage.EXIST)
      }
      await this._sitemanagerRepository.updateSitemanagerDetails({ _id, username, email })
      return ResponseHelper.success(SitemanagerSuccessMessage.UPDATE)
   }
}

