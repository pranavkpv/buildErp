import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IUnitModelEntity } from "../../../ModelEntities/Unit.Entity";

export interface IFetchUnitUseCase {
   execute():Promise<IUnitModelEntity[] | [] | commonOutput>
}