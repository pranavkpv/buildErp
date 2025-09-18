import Stripe from "stripe";
import { IPaymentRepostory } from "../../domain/Entities/IRepository/IPayment";
import { PaymentInput } from "../../application/Entities/payment.entity";
import { paymentDB } from "../../api/models/PaymentMode";
import { IPaymentModelEntity } from "../../domain/Entities/modelEntities/payment.entity";
import { listingInput } from "../../application/Entities/common.entity";
import { paymentAggregateByStage } from "../../application/Entities/stage.entity";
import { stageDB } from "../../api/models/StageModel";

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
      await paymentDB.findOneAndUpdate({ stage_id: stageId }, { paymentStatus: status })
   }
   async getAggregatePaymentbyStage(input: listingInput):
      Promise<{ data: paymentAggregateByStage[]; totalPage: number; }> {
      const { search, page } = input
      const limit = 10
      const skip = page * 10
      const stage = await paymentDB.aggregate([
         {
            $addFields: {
               stageObjectId: {
                  $toObjectId: "$stage_id"
               }
            }
         },
         {
            $lookup: {
               from: "stages",
               localField: "stageObjectId",
               foreignField: "_id",
               as: "stageDetails"
            }
         }, { $unwind: "$stageDetails" },
         {
            $addFields: {
               projectObjectId: {
                  $toObjectId: "$stageDetails.project_id"
               }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "projectObjectId",
               foreignField: "_id",
               as: "projectDetails"
            }
         }, { $unwind: "$projectDetails" },
         {
            $match: {
               "projectDetails.project_name": {
                  $regex: search, $options: "i"
               }
            }
         },
         { $skip: skip }, { $limit: limit }
      ])
      const totalDoc = await paymentDB.aggregate([
         {
            $addFields: {
               stageObjectId: {
                  $toObjectId: "$stage_id"
               }
            }
         },
         {
            $lookup: {
               from: "stages",
               localField: "stageObjectId",
               foreignField: "_id",
               as: "stageDetails"
            }
         }, { $unwind: "$stageDetails" },
         {
            $addFields: {
               projectObjectId: {
                  $toObjectId: "$stageDetails.project_id"
               }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "projectObjectId",
               foreignField: "_id",
               as: "projectDetails"
            }
         }, { $unwind: "$projectDetails" },
         {
            $match: {
               "projectDetails.project_name": {
                  $regex: search, $options: "i"
               }, purpose: "stage payment"
            }
         },
      ])
      return {
         data: stage,
         totalPage: Math.ceil(totalDoc.length)
      }

   }
}