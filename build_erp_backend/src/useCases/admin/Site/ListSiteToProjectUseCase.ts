import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { sitemanagerOutput } from "../../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager";
import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository";
import { IListSiteToProject } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class ListSiteToProject implements IListSiteToProject {
   private addSiteToprojectRepo: IAddSiteToProjectRepository
   constructor(addSiteToprojectRepo: IAddSiteToProjectRepository) {
      this.addSiteToprojectRepo = addSiteToprojectRepo
   }
   async execute(page: number, search: string): Promise<sitemanagerOutput | commonOutput> {
      try {
         const { getAddSiteData, totalPage } = await this.addSiteToprojectRepo.findProjectwithSitemanager(page, search)
         return {
            success: true,
            message: SUCCESS_MESSAGE.PROJECT.FETCH,
            status_code: HTTP_STATUS.OK,
            data: getAddSiteData,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}