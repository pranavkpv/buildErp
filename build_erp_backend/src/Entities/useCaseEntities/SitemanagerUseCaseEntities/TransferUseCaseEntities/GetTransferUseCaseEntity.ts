import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { TransferOutput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Transfer";

export interface IGetTransferUseCase {
   execute(search: string, page: number, id: string): Promise<TransferOutput | commonOutput>
}