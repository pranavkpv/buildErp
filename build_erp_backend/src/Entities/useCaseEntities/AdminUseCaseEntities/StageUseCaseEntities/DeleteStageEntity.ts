import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteStageUseCase {
   execute(input:{deleteId:string}):Promise<commonOutput>
}