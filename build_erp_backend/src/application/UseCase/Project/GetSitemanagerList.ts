import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IGetSitemanagerListDataUseCase } from '../../IUseCases/IProject/IGetSitemanagerList';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectFailedMessage, ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { commonOutput } from '../../dto/common';
import { userBasechatListDTO } from '../../dto/project.dto';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';

export class GetSitemanagerListDataUseCase implements IGetSitemanagerListDataUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
      private _projectmapper: IProjectmapper,
    ) { }
    async execute(id: string): Promise<commonOutput<userBasechatListDTO[]> | commonOutput> {
        const projectData = await this._projectRepository.getUserChatProjects(id);
        if (projectData.length === 0 || !projectData) {
            return ResponseHelper.conflictData(ProjectFailedMessage.NOT_ADD_SITEMANAGER);
        }
        const project = this._projectmapper.toUserBaseChatDto(projectData);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, project);
    }
}