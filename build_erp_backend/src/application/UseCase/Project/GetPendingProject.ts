import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { fetchProjectIdnameDTO } from '../../dto/project.dto';
import { IGetPendingProjectUseCase } from '../../IUseCases/IProject/IGetPendingProject';

export class GetPendingProjectUseCase implements IGetPendingProjectUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
      private _projectMapper: IProjectmapper,
    ) { }
    async execute(): Promise<commonOutput<fetchProjectIdnameDTO[]>> {
        const data = await this._projectRepository.getProjectByStatus('pending');
        const mappedData = this._projectMapper.toIdandnameDto(data);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH,mappedData);
    }
}