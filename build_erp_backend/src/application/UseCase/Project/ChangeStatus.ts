import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { IChangeStatusUseCase } from '../../IUseCases/IProject/IChangeStatus';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { commonOutput } from '../../dto/common';


export class ChangeStatusUseCase implements IChangeStatusUseCase {
    constructor(
      private _projectRepository: IprojectRepository,
    ) { }
    async execute(id: string, status: string): Promise<commonOutput> {
        await this._projectRepository.updateProjectStatus(id, status);
        return ResponseHelper.success(ProjectSuccessMessage.STATUS_CHANGE + status);
    }
}

