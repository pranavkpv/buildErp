import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { UnitOutput } from "../../../Input-OutputEntities/MaterialEntities/unit";


export interface IFetchUnitUseCase {
   execute():Promise<UnitOutput | [] | commonOutput>
}