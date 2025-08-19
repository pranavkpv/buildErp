import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialOutput } from "../../../dto/MaterialEntities/material";

export interface IDisplayAddMaterialUseCaseEntity{
   execute(): Promise<materialOutput | commonOutput>
}