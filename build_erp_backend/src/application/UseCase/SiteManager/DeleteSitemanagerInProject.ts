import { IDeleteSiteToProjectUseCase } from '../../IUseCases/ISitemanager/IDeleteSitemanagerInProject';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SitemanagerSuccessMessage } from '../../../Shared/Messages/Sitemanager.Message';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { commonOutput } from '../../dto/common';



export class DeleteSiteToProjectUseCase implements IDeleteSiteToProjectUseCase {
  constructor(
    private _projectRepository: IprojectRepository,
  ) { }
  async execute(id: string, sitemanagerId: string): Promise<commonOutput> {
    await this._projectRepository.removeSitemanagerFromProject({ siteManager_id: sitemanagerId, selectedproject: id });
    return ResponseHelper.success(SitemanagerSuccessMessage.DELETE);
  }
}