import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { materialOutput } from "../../../../DTO/MaterialEntities/material";

export interface IDisplayAllMaterialUsecaseEntity{
   execute(page:number,search:string): Promise<materialOutput | commonOutput>
}