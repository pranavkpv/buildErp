import Stripe from "stripe";
import { IPaymentRepostory } from "../../domain/Entities/IRepository/IPayment";
import { PaymentInput } from "../../application/Entities/payment.entity";
import { paymentDB } from "../../api/models/PaymentMode";
import { IPaymentModelEntity } from "../../domain/Entities/modelEntities/payment.entity";

export class PaymentRepository implements IPaymentRepostory {
   constructor(
      private _stripe: Stripe
   ) { }
   async verifyWebhookSignature(payload: Buffer, signature: string, endpointSecret: string):
      Promise<Stripe.Event> {
      const event = await this._stripe.webhooks.constructEvent(
         payload,
         signature,
         endpointSecret,
      );
      return event;
   }
   async createCheckoutSession(input: PaymentInput):
      Promise<void> {
      const { date, stage_id, amount, paymentMethod, paymentStatus, purpose, stripeSessionId } = input
      const newPayment = new paymentDB({
         date,
         stage_id,
         amount,
         paymentMethod,
         paymentStatus,
         purpose,
         stripeSessionId
      })
      await newPayment.save()
   }
   async findBySessionId(sessionId: string):
      Promise<IPaymentModelEntity | null> {
      return await paymentDB.findOne({ stripeSessionId: sessionId })
   }
   async updatePaymentStatus(stageId: string, status: string):
      Promise<void> {
      await paymentDB.findOneAndUpdate({ stage_id: stageId},{paymentStatus: status })
   }
}