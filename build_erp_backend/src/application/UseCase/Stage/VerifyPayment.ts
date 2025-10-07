import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { IPaymentRepostory } from '../../../domain/Entities/IRepository/IPayment';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { StageFailedMessage, StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IVerifyPaymentUseCase } from '../../IUseCases/IStage/IVerifyPayment';

export class VerifyPaymentUseCase implements IVerifyPaymentUseCase {
    constructor(
      private _paymentRepository: IPaymentRepostory,
      private _stageRepository: IStageRepository,
      private _notificationRepository: INotificationRepository,
      private _projectRepository: IprojectRepository,
    ) { }
    async execute(stageId: string): Promise<commonOutput> {
        await this._paymentRepository.updatePaymentStatus(stageId, 'verified');
        await this._stageRepository.updatePaymentStatus(stageId, 'verified');
        const existStage = await this._stageRepository.getStageById(stageId);
        if (!existStage) {
            return ResponseHelper.conflictData(StageFailedMessage.NOT_EXIST);
        }
        const existProject = await this._projectRepository.getProjectById(existStage.project_id);
        if (!existProject) {
            return ResponseHelper.conflictData(StageFailedMessage.NOT_EXIST);
        }
        await this._notificationRepository.saveNotication(new Date(), `Admin is Verified you payment in ${ existProject?.project_name }`, existProject?.user_id,'project');
        return ResponseHelper.success(StageSuccessMessage.VERIFY_PAYMENT);
    }
}