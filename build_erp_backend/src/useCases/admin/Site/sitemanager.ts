import { ISitemanagerRepository } from "../../../domain/repositories/ISitemanagerRepository"



export class DisplayAllSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(page:number,search:string): Promise<{getSiteData:any[];totalPage:number }> {
      const {getSiteData,totalPage} = await this.SitemanagerRepository.findAllSitemanager(page,search)
      return {
         getSiteData,
         totalPage
      }
   }
}

