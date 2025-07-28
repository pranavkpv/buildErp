import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { getAddMaterialData } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IDisplayAddMaterialUseCase{
   execute(): Promise<getAddMaterialData | commonOutput>
}