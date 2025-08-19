import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeletePurchaseUseCaseEntity {
   execute(_id: string): Promise<commonOutput>
}