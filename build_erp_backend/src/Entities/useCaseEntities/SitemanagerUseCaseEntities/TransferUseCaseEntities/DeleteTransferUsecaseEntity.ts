import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteTransferUseCase {
   execute(_id:string):Promise<commonOutput>
}