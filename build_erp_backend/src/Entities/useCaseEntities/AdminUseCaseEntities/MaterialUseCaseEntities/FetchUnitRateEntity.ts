import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { materialOutput } from "../../../../DTO/MaterialEntities/material";

export interface IFetchUnitRateUseCaseEntity{
   execute(material_name:string,brand_name:string,unit_name:string):Promise<materialOutput | commonOutput>
}