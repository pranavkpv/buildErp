import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { RecieveInput } from "../../../../DTO/PurchaseEntity.ts/Receive";

export interface ISaveReceiveUseCaseEntity {
   execute(input:RecieveInput):Promise<commonOutput>
}