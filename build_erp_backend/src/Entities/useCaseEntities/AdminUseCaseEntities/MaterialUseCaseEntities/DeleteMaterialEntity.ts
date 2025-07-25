import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteMaterialUseCase{
   execute(_id:string): Promise<commonOutput>
}