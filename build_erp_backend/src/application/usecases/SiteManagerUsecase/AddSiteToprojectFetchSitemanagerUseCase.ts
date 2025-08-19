import { IAddSiteToProjectRepository } from "../../../domain/interfaces/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchSitemanagerUseCase } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/IAddSiteToProjectFetchSitemanagerUsecase"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { FetchsitemanagerInListDTO } from "../../dto/addsitemanagerToproject"
import { commonOutput } from "../../dto/common"
import { ISitemanagerMapper } from "../../../domain/mappers/ISitemanager.mapper"


export class AddSiteToprojectFetchSitemanagerUseCase implements IAddSiteToprojectFetchSitemanagerUseCase {
   constructor(
      private _addSiteToProjectRepository: IAddSiteToProjectRepository,
      private _sitemanagerMapper: ISitemanagerMapper
   ) { }
   async execute(): Promise<commonOutput<FetchsitemanagerInListDTO[]> | commonOutput> {
      const result = await this._addSiteToProjectRepository.findSitemanagerExcludeproject()
      const mappedData = this._sitemanagerMapper.toFetchSitemanagerNameandId(result)
      return ResponseHelper.success(SitemanagerSuccessMessage.FETCH, mappedData)
   }
}