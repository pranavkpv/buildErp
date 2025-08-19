import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialOutput } from "../../../dto/MaterialEntities/material";

export interface IFetchBrandByMaterialNameEntity {
   execute(material_name: string): Promise<materialOutput | commonOutput>
}