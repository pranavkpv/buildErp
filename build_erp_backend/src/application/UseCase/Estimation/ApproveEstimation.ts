import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IApproveEstimationUseCase } from '../../IUseCases/IEstimation/IApproveEstimation';

export class ApproveEstimationUseCase implements IApproveEstimationUseCase {
    constructor(
    private _estimationRepository: IEstimationRepository,
    private _projectRepository: IprojectRepository,
    private _notificationRepository: INotificationRepository,
    ) { }
    async execute(projectId: string): Promise<commonOutput> {
        await this._estimationRepository.updateEstimationStatus(true, projectId);
        await this._projectRepository.updateProjectStatus(projectId, 'processing');
        const existProject = await this._projectRepository.getProjectById(projectId);
        if (!existProject) {
            return ResponseHelper.conflictData(ProjectFailedMessage.FETCH);
        }
        await this._notificationRepository.saveNotication(new Date(), `User is Approved The Project ${ existProject.project_name }`, 'admin','addToSite');
        return ResponseHelper.success(EstimationSuccessMessage.APPROVE_SUCCESS);
    }
}