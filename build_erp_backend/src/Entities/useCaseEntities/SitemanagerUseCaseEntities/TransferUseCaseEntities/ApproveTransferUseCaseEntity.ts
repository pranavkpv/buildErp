import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { transferInput } from "../../../../DTO/PurchaseEntity.ts/Transfer";

export interface IApproveTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}