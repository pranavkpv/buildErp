import { IDeleteSiteToProjectUseCase } from "../../IUseCases/ISitemanager/IDeleteSitemanagerInProject"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject"
import { commonOutput } from "../../dto/common"


export class DeleteSiteToProjectUseCase implements IDeleteSiteToProjectUseCase {
   constructor(
      private _projectRepository: IprojectRepository
   ) { }
   async execute(_id: string, sitemanager_id: string): Promise<commonOutput> {
      await this._projectRepository.removeSitemanagerFromProject({ siteManager_id: sitemanager_id, selectedproject: _id })
      return ResponseHelper.success(SitemanagerSuccessMessage.DELETE)
   }
}