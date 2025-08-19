import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { IAddSiteToProjectUseCase } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectEntity"
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository"
import { AddsitetoprojectInput } from "../../entities/addsitemanagertoproject.entity"
import { commonOutput } from "../../dto/common"


export class AddSiteToProjectUseCase implements IAddSiteToProjectUseCase {
   constructor(
      private _projectRepository: IprojectRepository
   ) { }
   async execute(input: AddsitetoprojectInput): Promise<commonOutput> {
      const { siteManager_id, selectedproject } = input
      for (let i = 0; i < selectedproject.length; i++) {
         await this._projectRepository.addSitemanagerToProject({ siteManager_id, selectedproject: selectedproject[i] })
      }
      return ResponseHelper.success(SitemanagerSuccessMessage.ADD)
   }
}






