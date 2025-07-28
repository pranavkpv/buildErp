import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { ILabourModelEntity } from "../../../ModelEntities/Labour.Entity";

export interface IFetchLabourByIdUsecase{
   execute(_id:string):Promise<ILabourModelEntity | null | commonOutput>
}