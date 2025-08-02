import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { transferInput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Transfer";

export interface ISaveTransferUseCase {
   execute(input:transferInput):Promise<commonOutput>
}