import { commonOutput } from "../../../dto/CommonEntities/common";
import { RecieveInput } from "../../../dto/PurchaseEntity.ts/Receive";

export interface ISaveReceiveUseCaseEntity {
   execute(input:RecieveInput):Promise<commonOutput>
}