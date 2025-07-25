import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository";
import { IListSiteToProject } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";



export class ListSiteToProject implements IListSiteToProject {
  private addSiteToprojectRepo : IAddSiteToProjectRepository
  constructor(addSiteToprojectRepo : IAddSiteToProjectRepository){
   this.addSiteToprojectRepo = addSiteToprojectRepo
  }
   async execute(page: number, search: string): Promise<{ getAddSiteData: any[]; totalPage: number }> {
      const { getAddSiteData, totalPage } = await this.addSiteToprojectRepo.findProjectwithSitemanager(page,search)
      return {
         getAddSiteData,
         totalPage
      }
   }
}