import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { transferInput } from "../../../../DTO/PurchaseEntity.ts/Transfer";

export interface ISaveTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}