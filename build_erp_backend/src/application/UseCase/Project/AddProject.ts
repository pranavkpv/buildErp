import { IAddProjectUseCase } from '../../IUseCases/IProject/IAddProject';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectFailedMessage, ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { addProjectInput } from '../../Entities/project.entity';
import { commonOutput } from '../../dto/common';
import { IUserRepository } from '../../../domain/Entities/IRepository/IUser';
import { userFailedMessage } from '../../../Shared/Messages/User.Message';


export class AddProjectUseCase implements IAddProjectUseCase {
    constructor(
        private _projectRepository: IprojectRepository,
        private _userRepository: IUserRepository
    ) { }
    async execute(input: addProjectInput): Promise<commonOutput<string> | commonOutput> {
        const { _id, project_name, type, floor, cost, address, area, description, latitude, longitude } = input;
        const userData = await this._userRepository.getUserById(_id)
        if (!userData) {
            return ResponseHelper.conflictData(userFailedMessage.USER_NOT_FOUND)
        }
        const email = userData.email
        const mobile_number = userData.phone
        const existProject = await this._projectRepository.getProjectByName(project_name);
        if (existProject) {
            return ResponseHelper.conflictData(ProjectFailedMessage.EXIST_PROJECT);
        }
        const response = await this._projectRepository.createProject({ user_id: _id, project_name, type, floor, cost, address, area, description, latitude, longitude, email, mobile_number });
        if (!response) {
            return ResponseHelper.conflictData(ProjectFailedMessage.ADD_FAIL)
        }
        return ResponseHelper.createdSuccess(ProjectSuccessMessage.ADD, response._id);
    }
}
