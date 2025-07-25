import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IdeleteUnitUseCase {
   execute(_id:string): Promise<commonOutput>
}