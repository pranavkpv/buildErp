import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IDisplayAddMaterialUseCase{
   execute(): Promise<materialOutput | commonOutput>
}