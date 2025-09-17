
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IFetchStatusBaseProjectUseCase } from '../../IUseCases/IProject/IFetchStatusBaseProject';
import { fetchprojectInput } from '../../Entities/project.entity';
import { commonOutput } from '../../dto/common';
import { publicProjectDTO } from '../../dto/project.dto';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import cloudinary from '../../../infrastructure/config/cloudinary';

export class FetchStatusBaseProjectUseCase implements IFetchStatusBaseProjectUseCase {
    constructor(
    private _projectRepository: IprojectRepository,
    private _projectmapper: IProjectmapper,
    ) { }
    async execute(input: fetchprojectInput): Promise<commonOutput<{ projectData: publicProjectDTO[], totalPage: number, areas: number[] }> | commonOutput> {
        const { data, totalPage, areas } = await this._projectRepository.getProjectsByStatus(input);
        for (const element of data) {
            element.expected_image[0].image = cloudinary.url(element.expected_image[0].image, {
                type: 'authenticated',
                sign_url: true,
                expires_at: Math.floor(Date.now() / 1000) + 60,
            });
        }
        const mappedData = this._projectmapper.toPublicProjectDto(data);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, { projectData: mappedData, totalPage, areas });
    }
}