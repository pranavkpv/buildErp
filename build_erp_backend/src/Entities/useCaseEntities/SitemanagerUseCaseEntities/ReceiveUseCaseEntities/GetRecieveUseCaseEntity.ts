import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { RecieveOutput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Receive";

export interface IGetReceiveUseCase {
   execute(search: string, page: number): Promise<RecieveOutput | commonOutput>
}