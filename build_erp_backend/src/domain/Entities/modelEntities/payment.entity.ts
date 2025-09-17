export interface IPaymentModelEntity {
   _id: string
   date: Date
   stage_id: string
   amount: number
   paymentMethod: string
   paymentStatus: string
   purpose: string
   stripeSessionId:string
   createdAt:Date 
   updatedAt:Date
}