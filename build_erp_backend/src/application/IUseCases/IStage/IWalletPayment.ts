import { commonOutput } from "../../dto/common";

export interface IWalletPaymentUseCase {
   execute(stageId: string, stageAmount: number): Promise<commonOutput>
}