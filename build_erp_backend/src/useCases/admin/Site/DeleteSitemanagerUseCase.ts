import { ISitemanagerRepository } from "../../../domain/repositories/ISitemanagerRepository"
import { deleteSitemanagerInput, OutPutSitemanager } from "../../../domain/types/sitemanager"


export class DeleteSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
    async execute(input:deleteSitemanagerInput):Promise<OutPutSitemanager> {
      const {_id} = input
      await this.SitemanagerRepository.deleteSitemanager(_id)
      return { success: true, message: "Sitemanager deleted successfully" }
    }

}
