import Stripe from 'stripe';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { StageFailedMessage, StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IPaymentIntendCreationUseCase } from '../../IUseCases/IStage/IPaymentIntendCreation';
import { IPaymentRepostory } from '../../../domain/Entities/IRepository/IPayment';
import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;

export class PaymentIntendCreationUseCase implements IPaymentIntendCreationUseCase {
    constructor(
        private _stageRepository: IStageRepository,
        private _paymentRepository: IPaymentRepostory,
        private _notificationRepository: INotificationRepository,
        private _projectRepository: IprojectRepository,
    ) { }
    async execute(stageId: string, stageAmount: number): Promise<commonOutput<string> | commonOutput> {
        const stageData = await this._stageRepository.getStageById(stageId);
        if (stageAmount !== stageData?.stage_amount) {
            return ResponseHelper.conflictData(StageFailedMessage.STAGE_AMOUNT_MATCH);
        }
        if (!stageData) {
            return ResponseHelper.conflictData(StageFailedMessage.NOT_EXIST);
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: { name: 'Stage Session' },
                        unit_amount: Math.floor(stageAmount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${ frontendBaseUrl }/profile/project`,
            cancel_url: `${ frontendBaseUrl }`,

            metadata: { stagename: stageData.stage_name, stageamount: stageData.stage_amount },
        });
        if (!session.url) {
            return ResponseHelper.conflictData(StageFailedMessage.NOT_EXIST);
        }
        await this._paymentRepository.createCheckoutSession({
            date: new Date(), amount: stageAmount, paymentMethod: 'stripe',
            purpose: 'stage payment', paymentStatus: 'pending', stage_id: stageData._id, stripeSessionId: session.id,
        });
        const existStage = await this._stageRepository.getStageById(stageData._id);
        if (!existStage) {
            return ResponseHelper.conflictData(StageFailedMessage.NOT_EXIST);
        }
        const existProject = await this._projectRepository.getProjectById(existStage.project_id);
        if (!existProject) {
            return ResponseHelper.conflictData(StageFailedMessage.NOT_EXIST);
        }
        await this._paymentRepository.updatePaymentStatus(stageData._id, 'success');
        await this._stageRepository.updatePaymentStatus(stageData._id, 'completed');

        await this._notificationRepository.saveNotication(new Date(), `User is paid ${ existStage.stage_amount } with project as ${ existProject?.project_name } and stage as ${ existStage.stage_name }`, 'admin','verify');
        return ResponseHelper.success(StageSuccessMessage.FETCH_SECRET, session.url);
    }
}