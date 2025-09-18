import { commonOutput } from "../../dto/common";

export interface IRejectTransferUsecase {
   execute(transferId: string): Promise<commonOutput>
}