
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IFetchStatusBaseProjectUseCase } from '../../IUseCases/IProject/IFetchStatusBaseProject';
import { fetchprojectInput } from '../../entities/project.entity';
import { commonOutput } from '../../dto/common';
import { publicProjectDTO } from '../../dto/project.dto';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';

export class FetchStatusBaseProjectUseCase implements IFetchStatusBaseProjectUseCase {
    constructor(
    private _projectRepository: IprojectRepository,
    private _projectmapper: IProjectmapper,
    ) { }
    async execute(input: fetchprojectInput): Promise<commonOutput<{ projectData: publicProjectDTO[], totalPage: number, areas: number[] }> | commonOutput> {
        const { data, totalPage, areas } = await this._projectRepository.getProjectsByStatus(input);
        const mappedData = this._projectmapper.toPublicProjectDto(data);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, { projectData: mappedData, totalPage, areas });
    }
}