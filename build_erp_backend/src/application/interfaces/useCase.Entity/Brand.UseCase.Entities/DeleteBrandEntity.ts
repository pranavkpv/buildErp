import { commonOutput } from "../../dto/CommonEntities/common";

export interface IDeleteBrandUsecaseEntity{
   execute(_id:string): Promise<commonOutput>
}