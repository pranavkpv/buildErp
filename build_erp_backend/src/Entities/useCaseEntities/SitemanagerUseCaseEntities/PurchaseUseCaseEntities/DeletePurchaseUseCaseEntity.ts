import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeletePurchaseUseCase {
   execute(_id: string): Promise<commonOutput>
}