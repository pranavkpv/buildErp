import { ISitemanagerRepository } from "../../../domain/Entities/IRepository/ISitemanager"
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { IDeleteSitemanagerUseCase } from "../../IUseCases/ISitemanager/IDeleteSitemanager"




export class DeleteSitemanagerUseCase implements IDeleteSitemanagerUseCase {
   constructor(
      private _sitemanagerRepository: ISitemanagerRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      await this._sitemanagerRepository.removeSitemanagerById(_id)
      return ResponseHelper.success(SitemanagerSuccessMessage.DELETE)
   }

}
