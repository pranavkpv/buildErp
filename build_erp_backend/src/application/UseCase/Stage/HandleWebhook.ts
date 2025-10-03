import Stripe from 'stripe';
import { IPaymentRepostory } from '../../../domain/Entities/IRepository/IPayment';
import { IHandleWebhookUseCase } from '../../IUseCases/IStage/IHandlewebhook';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { StageFailedMessage, StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';

export class HandleWebhookUseCase implements IHandleWebhookUseCase {
    constructor(
        private _paymentRepository: IPaymentRepostory,
        private _stageRepository: IStageRepository,
        private _notificationRepository: INotificationRepository,
        private _projectRepository: IprojectRepository,
    ) { }
    async execute(payload: Buffer, signature: string, endpointSecret: string): Promise<commonOutput> {
        const event = await this._paymentRepository.verifyWebhookSignature(payload, signature, endpointSecret);
        console.log('Webhook event received:', event.type);
        switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const sessionId = session.id;

            const payment = await this._paymentRepository.findBySessionId(sessionId);
            if (!payment) {
                return ResponseHelper.conflictData(StageFailedMessage.NO_SESSION);
            }


            const existStage = await this._stageRepository.getStageById(payment.stage_id);
            if (!existStage) {
                return ResponseHelper.conflictData(StageFailedMessage.NOT_EXIST);
            }
            const existProject = await this._projectRepository.getProjectById(existStage.project_id);
            if (!existProject) {
                return ResponseHelper.conflictData(StageFailedMessage.NOT_EXIST);
            }
            await this._paymentRepository.updatePaymentStatus(payment.stage_id, 'success');
            await this._stageRepository.updatePaymentStatus(payment.stage_id, 'completed');

            await this._notificationRepository.saveNotication(new Date(), `User is paid ${ existStage.stage_amount } with project as ${ existProject?.project_name } and stage as ${ existStage.stage_name }`, 'admin');
            return ResponseHelper.success(StageSuccessMessage.SUCCESS_PAY);
        }

        case 'checkout.session.expired': {
            const session = event.data.object as Stripe.Checkout.Session;
            const sessionId = session.id;

            const payment = await this._paymentRepository.findBySessionId(sessionId);
            if (!payment) {
                return ResponseHelper.conflictData(StageFailedMessage.NO_SESSION);
            }

            await this._paymentRepository.updatePaymentStatus(sessionId, 'failed');
            return ResponseHelper.conflictData(StageFailedMessage.PAY_FAIL);
        }
        default:
            console.log(`Unhandled event type: ${ event.type }`);
            return ResponseHelper.success('Event received');
        }
    }

}
