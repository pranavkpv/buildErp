import { commonOutput } from "../../../dto/CommonEntities/common";
import { transferInput } from "../../../dto/PurchaseEntity.ts/Transfer";

export interface ISaveTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}