import { commonOutput } from "../../../dto/CommonEntities/common";
import { RecieveInput } from "../../../dto/PurchaseEntity.ts/Receive";

export interface IUpdateReceiveUseCaseEntity {
   execute(Input:RecieveInput):Promise<commonOutput>
}