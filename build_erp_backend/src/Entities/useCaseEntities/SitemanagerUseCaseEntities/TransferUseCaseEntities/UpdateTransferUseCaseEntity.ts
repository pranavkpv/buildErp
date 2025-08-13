import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { transferInput } from "../../../../DTO/PurchaseEntity.ts/Transfer";

export interface IUpdateTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}