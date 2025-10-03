import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { Role } from '../../../Shared/Constants/Role.constant';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { userBaseProjectDTO } from '../../dto/project.dto';
import { IUpdateEstimationByUseCase } from '../../IUseCases/IRquirement/IUpdateEstimationBy';

export class UpdateEstimationByUseCase implements IUpdateEstimationByUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
    ) { }
    async execute(projectId: string): Promise<commonOutput | commonOutput<userBaseProjectDTO>> {
        await this._projectRepository.updateEstimatedUser(Role.ADMIN, projectId);
        return ResponseHelper.success(EstimationSuccessMessage.TAKE_DEFAULT);
    }
}