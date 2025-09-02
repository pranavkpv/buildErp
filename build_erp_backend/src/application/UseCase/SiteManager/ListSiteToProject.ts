import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { IListSiteToProjectUseCase } from '../../IUseCases/ISitemanager/IListSiteToProject';
import { IAddSiteToProjectRepository } from '../../../domain/Entities/IRepository/IAddSiteToProject';
import { commonOutput } from '../../dto/common';
import { listAddsiteDTO } from '../../dto/addsitemanagerToproject';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';



export class ListSiteToProjectUsecase implements IListSiteToProjectUseCase {
    constructor(
      private _addSiteToprojectRepo: IAddSiteToProjectRepository,
      private _projectmapper: IProjectmapper,
    ) { }
    async execute(page: number, search: string):
      Promise<commonOutput<{ data: listAddsiteDTO[], totalPage: number }> | commonOutput> {
        const { getAddSiteData, totalPage } = await this._addSiteToprojectRepo.getProjectsWithSiteManager(page, search);
        const mappedData = this._projectmapper.toListAddsiteToprojectDto(getAddSiteData);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, { data: mappedData, totalPage });
    }
}