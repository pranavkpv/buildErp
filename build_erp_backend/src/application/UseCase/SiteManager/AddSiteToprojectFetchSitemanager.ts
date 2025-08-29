import { IAddSiteToProjectRepository } from '../../../domain/Entities/IRepository/IAddSiteToProject';
import { IAddSiteToprojectFetchSitemanagerUseCase } from '../../IUseCases/ISitemanager/IAddSiteToProjectFetchSitemanager';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SitemanagerSuccessMessage } from '../../../Shared/Messages/Sitemanager.Message';
import { FetchsitemanagerInListDTO } from '../../dto/addsitemanagerToproject';
import { commonOutput } from '../../dto/common';
import { ISitemanagerMapper } from '../../../domain/mappers/ISitemanager.mapper';


export class AddSiteToprojectFetchSitemanagerUseCase implements IAddSiteToprojectFetchSitemanagerUseCase {
    constructor(
      private _addSiteToProjectRepository: IAddSiteToProjectRepository,
      private _sitemanagerMapper: ISitemanagerMapper,
    ) { }
    async execute(): Promise<commonOutput<FetchsitemanagerInListDTO[]> | commonOutput> {
        const result = await this._addSiteToProjectRepository.getUnassignedSiteManagers();
        const mappedData = this._sitemanagerMapper.toFetchSitemanagerNameandId(result);
        return ResponseHelper.success(SitemanagerSuccessMessage.FETCH, mappedData);
    }
}