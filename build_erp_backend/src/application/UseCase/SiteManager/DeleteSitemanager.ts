import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { ISitemanagerRepository } from '../../../domain/Entities/IRepository/ISitemanager';
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from '../../../Shared/Messages/Sitemanager.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IDeleteSitemanagerUseCase } from '../../IUseCases/ISitemanager/IDeleteSitemanager';




export class DeleteSitemanagerUseCase implements IDeleteSitemanagerUseCase {
  constructor(
    private _sitemanagerRepository: ISitemanagerRepository,
    private _projectRepository: IprojectRepository
  ) { }
  async execute(id: string): Promise<commonOutput> {
    const existSitemanagerInProject =  await this._projectRepository.getProjectsBySitemanagerId(id)
    if(existSitemanagerInProject){
      return ResponseHelper.conflictData(SitemanagerFailedMessage.ADD_PROJECT)
    }
    await this._sitemanagerRepository.removeSitemanagerById(id);
    return ResponseHelper.success(SitemanagerSuccessMessage.DELETE);
  }

}
