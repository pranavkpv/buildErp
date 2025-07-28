import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { ILabourModelEntity } from "../../../ModelEntities/Labour.Entity";

export interface IFetchAllLabourUseCase{
   execute():Promise<ILabourModelEntity[] | [] | commonOutput>
}