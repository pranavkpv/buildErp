import { IDisplayAllSitemanagerUseCase } from "../../IUseCases/ISitemanager/IDisplayAllsitemanager";
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ISitemanagerRepository } from "../../../domain/Entities/IRepository/ISitemanager";
import { commonOutput } from "../../dto/common";
import { listSitemanagerDTO } from "../../dto/sitemanager.dto";
import { listingInput } from "../../Entities/common.entity";
import { ISitemanagerMapper } from "../../../domain/mappers/ISitemanager.mapper";


export class DisplayAllSitemanagerUseCase implements IDisplayAllSitemanagerUseCase {
   constructor(
      private _SitemanagerRepository: ISitemanagerRepository,
      private _sitemanagermapper: ISitemanagerMapper
   ) { }
   async execute(input: listingInput):
      Promise<commonOutput<{ data: listSitemanagerDTO[], totalPage: number }> | commonOutput> {
      const { getSiteData, totalPage } = await this._SitemanagerRepository.getAllSitemanagers(input)
      const mappedData = this._sitemanagermapper.toListingSitemanagerDTO(getSiteData)
      return ResponseHelper.success(SitemanagerSuccessMessage.FETCH, { data: mappedData, totalPage })
   }
}

