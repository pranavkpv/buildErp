import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IFetchUserProjectUseCase } from '../../IUseCases/IProject/IFetchUserProject';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { commonOutput } from '../../dto/common';
import { userBaseProjectDTO } from '../../dto/project.dto';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';
import cloudinary from '../../../infrastructure/config/cloudinary';

export class FetchUserProjectUseCase implements IFetchUserProjectUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
      private _projectmapper: IProjectmapper,
    ) { }
    async execute(id: string): Promise<commonOutput<userBaseProjectDTO[]> | commonOutput> {
        const projectList = await this._projectRepository.getProjectsByUserId(id);
         for (const element of projectList) {
              element.expected_image = cloudinary.url(element.expected_image, {
                type: 'authenticated',
                sign_url: true,
                expires_at: Math.floor(Date.now() / 1000) + 60,
              });
            }
        const mappedUser = this._projectmapper.touserBaseProjectDto(projectList);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, mappedUser);
    }
}