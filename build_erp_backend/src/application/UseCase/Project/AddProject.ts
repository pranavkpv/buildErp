import { IAddProjectUseCase } from '../../IUseCases/IProject/IAddProject';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectFailedMessage, ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { addProjectInput } from '../../Entities/project.entity';
import { commonOutput } from '../../dto/common';


export class AddProjectUseCase implements IAddProjectUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
    ) { }
    async execute(input: addProjectInput): Promise<commonOutput> {
        const { project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = input;
        const existProject = await this._projectRepository.getProjectByName(project_name);
        if (existProject) {
            return ResponseHelper.conflictData(ProjectFailedMessage.EXIST_PROJECT);
        }
        await this._projectRepository.createProject({ project_name, user_id, address, mobile_number, email, area, description, latitude, longitude });
        return ResponseHelper.createdSuccess(ProjectSuccessMessage.ADD);
    }
}
