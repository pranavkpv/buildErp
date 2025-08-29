import { IListProjectUseCase } from '../../IUseCases/IStageStatusUpdation/IListProject';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { commonOutput } from '../../dto/common';
import { IProjectmapper } from '../../../domain/mappers/IProject.mapper';
import { fetchProjectIdnameDTO } from '../../dto/project.dto';

export class ListProjectUseCase implements IListProjectUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
      private _projectMapper: IProjectmapper,
    ) { }
    async execute(user: string): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput> {
        const data = await this._projectRepository.getProjectsBySitemanagerId(user);
        const mappedData = await this._projectMapper.toIdandnameDto(data);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, mappedData);
    }
}