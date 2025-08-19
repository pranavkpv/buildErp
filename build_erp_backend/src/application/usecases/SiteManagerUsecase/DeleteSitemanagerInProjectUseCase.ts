import { IDeleteSiteToProjectUseCase } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerInProjectEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository"
import { commonOutput } from "../../dto/common"


export class DeleteSiteToProjectUseCase implements IDeleteSiteToProjectUseCase {
   constructor(
      private _projectRepository: IprojectRepository
   ) { }
   async execute(_id: string, sitemanager_id: string): Promise<commonOutput> {
      await this._projectRepository.removeSitemanagerInProject({ siteManager_id: sitemanager_id, selectedproject: _id })
      return ResponseHelper.success(SitemanagerSuccessMessage.DELETE)
   }
}