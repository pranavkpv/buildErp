import { IPaymentModelEntity } from "../../domain/Entities/modelEntities/payment.entity"
import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity"
import { IStageModelEntity } from "../../domain/Entities/modelEntities/stage.entity"

export interface PaymentInput {
   date: Date
   stage_id: string
   amount: number
   paymentMethod: string
   paymentStatus: string
   purpose: string
   stripeSessionId: string
}

export interface walletByUser extends IPaymentModelEntity {
   stageDetails:IStageModelEntity ,
   projectDetails:IProjectModelEntity
}

export interface payByProject extends IPaymentModelEntity {
    stageDetails:IStageModelEntity
}