import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { rejectEstimationInput } from '../../entities/estimation.entity';
import { IRejectEstimationUseCase } from '../../IUseCases/IEstimation/IRejectEstimation';

export class RejectEstimationUsecase implements IRejectEstimationUseCase {
    constructor(
    private _projectRepository: IprojectRepository,
    private _estimationRepository: IEstimationRepository,
    private _notificationRepository: INotificationRepository,
    ) { }
    async execute(input: rejectEstimationInput): Promise<commonOutput> {
        const { reason, projectId } = input;
        await this._projectRepository.updateEstimationStatus(false, projectId);
        await this._estimationRepository.updateRejectStatusAndReason(projectId, reason);
        const existProject = await this._projectRepository.getProjectById(projectId);
        if (!existProject) {
            return ResponseHelper.conflictData(ProjectFailedMessage.FETCH);
        }
        await this._notificationRepository.saveNotication(new Date(), `User is Reject The Project ${ existProject.project_name }`, 'admin');
        return ResponseHelper.success(EstimationSuccessMessage.REJECT_SUCCESS);
    }
}