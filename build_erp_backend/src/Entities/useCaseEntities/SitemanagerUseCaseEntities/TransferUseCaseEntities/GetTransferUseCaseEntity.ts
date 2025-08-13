import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { TransferOutput } from "../../../../DTO/PurchaseEntity.ts/Transfer";

export interface IGetTransferUseCaseEntity {
   execute(search: string, page: number, id: string): Promise<TransferOutput | commonOutput>
}