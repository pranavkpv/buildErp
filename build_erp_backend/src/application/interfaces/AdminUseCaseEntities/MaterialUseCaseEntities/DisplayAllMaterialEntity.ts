import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialOutput } from "../../../dto/MaterialEntities/material";

export interface IDisplayAllMaterialUsecaseEntity{
   execute(page:number,search:string): Promise<materialOutput | commonOutput>
}