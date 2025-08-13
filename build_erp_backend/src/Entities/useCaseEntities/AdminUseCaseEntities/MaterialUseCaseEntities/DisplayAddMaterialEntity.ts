import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { materialOutput } from "../../../../DTO/MaterialEntities/material";

export interface IDisplayAddMaterialUseCaseEntity{
   execute(): Promise<materialOutput | commonOutput>
}