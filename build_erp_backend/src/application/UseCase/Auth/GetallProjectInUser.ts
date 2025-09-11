import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IGetAllProjectListInUserusecase } from '../../IUseCases/IAuth/IGetallProjectInUser';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';
import { publicProjectDTO } from '../../dto/project.dto';
import cloudinary from '../../../infrastructure/config/cloudinary';

export class GetAllProjectListInUserUseCase implements IGetAllProjectListInUserusecase {
    constructor(
    private _projectRepository: IprojectRepository,
    private _projectmapper: IProjectmapper,
    ) { }
    async execute(): Promise<commonOutput<publicProjectDTO[]>> {
        const projectList = await this._projectRepository.getAllProjects();
        for (const element of projectList) {
            element.expected_image = cloudinary.url(element.expected_image, {
                type: 'authenticated',
                sign_url: true,
                expires_at: Math.floor(Date.now() / 1000) + 60,
            });
        }
        const mappedProjectData = this._projectmapper.toPublicProjectDto(projectList);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, mappedProjectData);
    }
}