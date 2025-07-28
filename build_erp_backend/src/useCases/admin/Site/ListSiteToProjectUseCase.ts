import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository";
import { IListSiteToProject } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class ListSiteToProject implements IListSiteToProject {
  private addSiteToprojectRepo : IAddSiteToProjectRepository
  constructor(addSiteToprojectRepo : IAddSiteToProjectRepository){
   this.addSiteToprojectRepo = addSiteToprojectRepo
  }
   async execute(page: number, search: string): Promise<{ getAddSiteData: any[]; totalPage: number } | commonOutput> {
      try {
         const { getAddSiteData, totalPage } = await this.addSiteToprojectRepo.findProjectwithSitemanager(page,search)
      return {
         getAddSiteData,
         totalPage
      }
      } catch (error: any) {
          return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}