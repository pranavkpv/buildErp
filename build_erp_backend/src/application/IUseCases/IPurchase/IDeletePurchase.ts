import { commonOutput } from "../../dto/common";


export interface IDeletePurchaseUseCase {
   execute(_id: string): Promise<commonOutput>
}