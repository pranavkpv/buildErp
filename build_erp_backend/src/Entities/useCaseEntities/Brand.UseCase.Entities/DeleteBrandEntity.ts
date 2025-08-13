import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IDeleteBrandUsecaseEntity{
   execute(_id:string): Promise<commonOutput>
}