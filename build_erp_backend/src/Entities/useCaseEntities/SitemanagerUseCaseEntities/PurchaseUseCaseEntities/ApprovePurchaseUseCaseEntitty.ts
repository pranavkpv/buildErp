import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IApprovePurchaseUseCase {
   execute(_id:string):Promise<commonOutput>
}