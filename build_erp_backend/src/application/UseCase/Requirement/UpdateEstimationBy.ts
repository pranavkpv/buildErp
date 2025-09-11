import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';
import { Role } from '../../../Shared/Constants/Role.constant';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { userBaseProjectDTO } from '../../dto/project.dto';
import { IUpdateEstimationByUseCase } from '../../IUseCases/IRquirement/IUpdateEstimationBy';

export class UpdateEstimationByUseCase implements IUpdateEstimationByUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
      private _projectmapper: IProjectmapper,
    ) { }
    async execute(projectId: string): Promise<commonOutput | commonOutput<userBaseProjectDTO>> {
        await this._projectRepository.updateEstimatedUser(Role.ADMIN, projectId);
        const projectData = await this._projectRepository.getProjectById(projectId);
        if (!projectData) {
            return ResponseHelper.conflictData(ProjectFailedMessage.FETCH);
        }
        const mappedData = this._projectmapper.toUserBaseOneProjectDto(projectData);
        return ResponseHelper.success(EstimationSuccessMessage.TAKE_DEFAULT, mappedData);
    }
}