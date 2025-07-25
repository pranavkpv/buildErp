import { ISitemanagerRepository } from "../../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { IDisplayAllSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity";



export class DisplayAllSitemanagerUseCase implements IDisplayAllSitemanagerUseCase {
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

