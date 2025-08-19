import { commonOutput } from "../../../dto/CommonEntities/common";
import { RecieveOutput } from "../../../dto/PurchaseEntity.ts/Receive";

export interface IGetReceiveUseCaseEntity {
   execute(search: string, page: number): Promise<RecieveOutput | commonOutput>
}