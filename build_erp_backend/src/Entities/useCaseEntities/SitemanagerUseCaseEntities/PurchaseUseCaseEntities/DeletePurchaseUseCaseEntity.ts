import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeletePurchaseUseCaseEntity {
   execute(_id: string): Promise<commonOutput>
}