import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IDisplayAllMaterialUsecase{
   execute(page:number,search:string): Promise<materialOutput | commonOutput>
}