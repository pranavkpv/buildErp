import { commonOutput } from "../../../dto/CommonEntities/common";
import { TransferOutput } from "../../../dto/PurchaseEntity.ts/Transfer";

export interface IGetTransferUseCaseEntity {
   execute(search: string, page: number, id: string): Promise<TransferOutput | commonOutput>
}