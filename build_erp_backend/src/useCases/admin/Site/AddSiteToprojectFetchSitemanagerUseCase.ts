import { IAddSiteToProjectRepository } from "../../../domain/repositories/IAddSiteToProjectRepository"
import { Sitemanager } from "../../../domain/types/sitemanager"


export class AddSiteToprojectFetchSitemanagerUseCase{
   private addSiteToProjectRepository : IAddSiteToProjectRepository
   constructor (addSiteToProjectRepository : IAddSiteToProjectRepository){
      this.addSiteToProjectRepository = addSiteToProjectRepository
   }
   async execute():Promise<Sitemanager[] | null>{
      const result = await this.addSiteToProjectRepository.findSitemanagerExcludeproject()
      return result ? result : null
   }
}