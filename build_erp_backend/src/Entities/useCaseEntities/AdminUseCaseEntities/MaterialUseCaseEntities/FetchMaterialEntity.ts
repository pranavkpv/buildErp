import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IFetchMaterialUseCase {
   execute():Promise<materialOutput | commonOutput>
}