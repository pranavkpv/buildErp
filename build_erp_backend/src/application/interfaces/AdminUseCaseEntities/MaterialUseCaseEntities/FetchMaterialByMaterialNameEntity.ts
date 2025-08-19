import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialOutput } from "../../../dto/MaterialEntities/material";

export interface IFetchMaterialByMaterialNameEntity{
   execute(material_name:string):Promise<materialOutput | commonOutput>
}