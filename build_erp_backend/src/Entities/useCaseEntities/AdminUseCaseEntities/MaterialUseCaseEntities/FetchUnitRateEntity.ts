import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IFetchUnitRateUseCase{
   execute(material_name:string,brand_name:string,unit_name:string):Promise<materialOutput | commonOutput>
}