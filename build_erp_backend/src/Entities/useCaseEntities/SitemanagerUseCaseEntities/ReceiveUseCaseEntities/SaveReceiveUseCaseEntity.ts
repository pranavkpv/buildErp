import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { RecieveInput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Receive";

export interface ISaveReceiveUseCase {
   execute(input:RecieveInput):Promise<commonOutput>
}