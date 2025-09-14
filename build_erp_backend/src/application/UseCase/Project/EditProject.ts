import { IEditProjectUseCase } from '../../IUseCases/IProject/IEditProject';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectFailedMessage, ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { editProjectInput } from '../../Entities/project.entity';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { commonOutput } from '../../dto/common';


export class EditProjectUseCase implements IEditProjectUseCase {
    constructor(
        private _projectRepository: IprojectRepository,
    ) { }
    async execute(input: editProjectInput): Promise<commonOutput> {
        const existData = await this._projectRepository.checkDuplicateProjectInEdit(input._id, input.project_name);
        if (existData) {
            return ResponseHelper.conflictData(ProjectFailedMessage.EXIST_PROJECT);
        }
        await this._projectRepository.UpdateProjectById(input);
        return ResponseHelper.success(ProjectSuccessMessage.UPDATE);
    }
}

