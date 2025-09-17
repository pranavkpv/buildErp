export interface PaymentInput {
   date: Date
   stage_id: string
   amount: number
   paymentMethod: string
   paymentStatus: string
   purpose: string
   stripeSessionId: string
}