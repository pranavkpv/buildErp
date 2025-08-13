import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { RecieveOutput } from "../../../../DTO/PurchaseEntity.ts/Receive";

export interface IGetReceiveUseCaseEntity {
   execute(search: string, page: number): Promise<RecieveOutput | commonOutput>
}