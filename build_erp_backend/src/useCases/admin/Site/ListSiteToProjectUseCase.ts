import { IAddSiteToProjectRepository } from "../../../domain/repositories/IAddSiteToProjectRepository";


export class ListSiteToProject {
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