import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IFetchProjectUseCase } from '../../IUseCases/IProject/IFetchProject';
import { commonOutput } from '../../dto/common';
import { fetchProjectIdnameDTO } from '../../dto/project.dto';
import { IProjectmapper } from '../../../domain/mappers/IProject.mapper';

export class FetchProjectUseCase implements IFetchProjectUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
      private _projectmapper: IProjectmapper,
    ) { }
    async execute(): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput> {
        const data = await this._projectRepository.getAllProjects();
        const mappedData = this._projectmapper.toIdandnameDto(data);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, mappedData);
    }
}