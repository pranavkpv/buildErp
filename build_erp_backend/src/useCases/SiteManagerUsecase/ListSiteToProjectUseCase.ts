import { commonOutput } from "../../DTO/CommonEntities/common";
import { sitemanagerOutput } from "../../DTO/SitemanagerEntities/sitemanager";
import { IAddSiteToProjectRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository";
import { IListSiteToProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";



export class ListSiteToProject implements IListSiteToProjectUseCaseEntity {
   private addSiteToprojectRepo: IAddSiteToProjectRepositoryEntity
   constructor(addSiteToprojectRepo: IAddSiteToProjectRepositoryEntity) {
      this.addSiteToprojectRepo = addSiteToprojectRepo
   }
   async execute(page: number, search: string): Promise<sitemanagerOutput | commonOutput> {
      const { getAddSiteData, totalPage } = await this.addSiteToprojectRepo.findProjectwithSitemanager({ page, search })
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, getAddSiteData, totalPage)
   }
}