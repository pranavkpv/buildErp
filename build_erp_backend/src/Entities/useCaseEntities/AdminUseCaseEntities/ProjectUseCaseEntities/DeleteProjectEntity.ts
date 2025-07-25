import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteProjectUseCase {
   execute(_id:string): Promise<commonOutput>
}