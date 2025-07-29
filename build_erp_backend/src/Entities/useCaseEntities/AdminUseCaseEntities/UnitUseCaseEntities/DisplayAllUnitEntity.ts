import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { UnitOutput } from "../../../Input-OutputEntities/MaterialEntities/unit";

export interface IDisplayAllUnitUseCase {
   execute(page:number,search:string): Promise<UnitOutput | commonOutput>
}