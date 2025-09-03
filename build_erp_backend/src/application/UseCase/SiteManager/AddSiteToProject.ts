import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from '../../../Shared/Messages/Sitemanager.Message';
import { IAddSiteToProjectUseCase } from '../../IUseCases/ISitemanager/IAddSiteToProject';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { AddsitetoprojectInput } from '../../Entities/addsitemanagertoproject.entity';
import { commonOutput } from '../../dto/common';


export class AddSiteToProjectUseCase implements IAddSiteToProjectUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
    ) { }
    async execute(input: AddsitetoprojectInput): Promise<commonOutput> {
        const { siteManager_id, selectedproject } = input;
        for (const element of selectedproject){
            const existSitemanager = await this._projectRepository.getProjectById(element);
            if (existSitemanager?.sitemanager_id){
                return ResponseHelper.conflictData(SitemanagerFailedMessage.SITEMANAGER_EXIST_PROJECT);
            }
        }
        for (let i = 0; i < selectedproject.length; i++) {
            await this._projectRepository.
                assignSitemanagerToProject({ siteManager_id, selectedproject: selectedproject[i] });
        }
        return ResponseHelper.success(SitemanagerSuccessMessage.ADD);
    }
}






