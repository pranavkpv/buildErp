import { commonOutput } from "../../../dto/CommonEntities/common";
import { transferInput } from "../../../dto/PurchaseEntity.ts/Transfer";

export interface IUpdateTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}