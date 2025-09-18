import { commonOutput } from "../../dto/common";

export interface IVerifyPaymentUseCase {
   execute(stageId:string):Promise<commonOutput>
}