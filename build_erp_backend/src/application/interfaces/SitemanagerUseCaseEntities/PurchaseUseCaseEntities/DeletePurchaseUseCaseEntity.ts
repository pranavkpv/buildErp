import { commonOutput } from "../../../dto/common";


export interface IDeletePurchaseUseCaseEntity {
   execute(_id: string): Promise<commonOutput>
}