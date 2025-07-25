import { outEditMaterialData } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IGetEditMaterialUseCase {
   execute(_id:string): Promise<outEditMaterialData>
}