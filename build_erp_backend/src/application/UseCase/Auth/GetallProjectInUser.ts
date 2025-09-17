import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IGetAllProjectListInUserusecase } from '../../IUseCases/IAuth/IGetallProjectInUser';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';
import { publicProjectDTO } from '../../dto/project.dto';

export class GetAllProjectListInUserUseCase implements IGetAllProjectListInUserusecase {
    constructor(
    private _projectRepository: IprojectRepository,
    private _projectmapper: IProjectmapper,
    ) { }
    async execute(): Promise<commonOutput<publicProjectDTO[]>> {
        const projectList = await this._projectRepository.getAllProject();
        const mappedProjectData = this._projectmapper.toPublicProjectDto(projectList);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, mappedProjectData);
    }
}