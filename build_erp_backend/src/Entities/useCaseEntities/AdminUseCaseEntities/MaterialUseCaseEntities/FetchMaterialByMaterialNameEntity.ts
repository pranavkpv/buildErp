import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IFetchMaterialByMaterialName{
   execute(material_name:string):Promise<materialOutput | commonOutput>
}