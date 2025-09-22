import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { EstimationFailedMessage, EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { ISendEstimationUseCase } from '../../IUseCases/IEstimation/IDeleteEstimation';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { commonOutput } from '../../dto/common';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';


export class SendEstimationUseCase implements ISendEstimationUseCase {

    constructor(
        private _estimationRepository: IEstimationRepository,
        private _stageRepository: IStageRepository,
        private _projectRepository: IprojectRepository,
        private _notificationRepository: INotificationRepository,
    ) { }
    async execute(id: string): Promise<commonOutput> {
        const existStage = await this._stageRepository.findStageByprojectId(id);
        if (existStage.length === 0) {
            return ResponseHelper.conflictData(EstimationFailedMessage.NOT_STAGE);
        }
        await this._estimationRepository.sendEstimationsByProjectId(id);
        await this._projectRepository.updateEstimationStatus(true, id);
        const existProject = await this._projectRepository.getProjectById(existStage[0].project_id);
        if (!existProject) {
            return ResponseHelper.conflictData(ProjectFailedMessage.FETCH);
        }
        await this._notificationRepository.saveNotication(new Date(), 'The Estimated Data sended by Admin', existProject?.user_id);
        return ResponseHelper.success(EstimationSuccessMessage.DELETE);
    }
}