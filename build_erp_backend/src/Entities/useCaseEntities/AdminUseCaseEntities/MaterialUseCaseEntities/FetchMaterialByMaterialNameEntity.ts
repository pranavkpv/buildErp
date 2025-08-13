import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { materialOutput } from "../../../../DTO/MaterialEntities/material";

export interface IFetchMaterialByMaterialNameEntity{
   execute(material_name:string):Promise<materialOutput | commonOutput>
}