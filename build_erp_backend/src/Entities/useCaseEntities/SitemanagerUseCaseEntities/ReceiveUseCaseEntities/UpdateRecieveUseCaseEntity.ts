import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { RecieveInput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Receive";

export interface IUpdateReceiveUseCase {
   execute(Input:RecieveInput):Promise<commonOutput>
}