import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { RecieveInput } from "../../../../DTO/PurchaseEntity.ts/Receive";

export interface IUpdateReceiveUseCaseEntity {
   execute(Input:RecieveInput):Promise<commonOutput>
}