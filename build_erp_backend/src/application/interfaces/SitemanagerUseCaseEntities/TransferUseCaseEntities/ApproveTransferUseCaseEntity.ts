import { commonOutput } from "../../../dto/CommonEntities/common";
import { transferInput } from "../../../dto/PurchaseEntity.ts/Transfer";

export interface IApproveTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}