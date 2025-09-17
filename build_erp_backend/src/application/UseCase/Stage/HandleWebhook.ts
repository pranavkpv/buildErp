import Stripe from "stripe";
import { IPaymentRepostory } from "../../../domain/Entities/IRepository/IPayment";
import { IHandleWebhookUseCase } from "../../IUseCases/IStage/IHandlewebhook";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { IStageRepository } from "../../../domain/Entities/IRepository/IStage";

export class HandleWebhookUseCase implements IHandleWebhookUseCase {
   constructor(
      private _paymentRepository: IPaymentRepostory,
      private _stageRepository: IStageRepository
   ) { }
   async execute(payload: Buffer, signature: string, endpointSecret: string): Promise<commonOutput> {
      const event = await this._paymentRepository.verifyWebhookSignature(payload, signature, endpointSecret);
      console.log("Webhook event received:", event.type);
      switch (event.type) {
         case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const sessionId = session.id;

            const payment = await this._paymentRepository.findBySessionId(sessionId);
            if (!payment) {
               return ResponseHelper.conflictData(StageFailedMessage.NO_SESSION);
            }

            await this._paymentRepository.updatePaymentStatus(payment.stage_id, 'success');
            await this._stageRepository.updatePaymentStatus(payment.stage_id, 'completed');
            return ResponseHelper.success(StageSuccessMessage.SUCCESS_PAY);
         }

         case 'checkout.session.expired': {
            const session = event.data.object as Stripe.Checkout.Session;
            const sessionId = session.id;

            const payment = await this._paymentRepository.findBySessionId(sessionId);
            if (!payment) {
               return ResponseHelper.conflictData(StageFailedMessage.NO_SESSION);
            }

            await this._paymentRepository.updatePaymentStatus(sessionId, "failed");
            return ResponseHelper.conflictData(StageFailedMessage.PAY_FAIL);
         }
         default:
            console.log(`Unhandled event type: ${ event.type }`);
            return ResponseHelper.success("Event received"); 
      }
   }

}
