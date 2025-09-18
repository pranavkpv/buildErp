import Stripe from "stripe";
import { PaymentInput } from "../../../application/Entities/payment.entity";
import { IPaymentModelEntity } from "../modelEntities/payment.entity";
import { listingInput } from "../../../application/Entities/common.entity";
import { paymentAggregateByStage } from "../../../application/Entities/stage.entity";

export interface IPaymentRepostory {
   verifyWebhookSignature(payload: Buffer, signature: string, endpointSecret: string): Promise<Stripe.Event>
   createCheckoutSession(input: PaymentInput): Promise<void>
   findBySessionId(sessionId: string): Promise<IPaymentModelEntity | null>
   updatePaymentStatus(stageId: string, status: string): Promise<void>
   getAggregatePaymentbyStage(input: listingInput): Promise<{data:paymentAggregateByStage[],totalPage:number}>
   getWalletHistoryRepo(input: listingInput): Promise<{data:paymentAggregateByStage[],totalPage:number}>
}