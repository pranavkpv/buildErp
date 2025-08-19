import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialOutput } from "../../../dto/MaterialEntities/material";

export interface IFetchUnitRateUseCaseEntity{
   execute(material_name:string,brand_name:string,unit_name:string):Promise<materialOutput | commonOutput>
}