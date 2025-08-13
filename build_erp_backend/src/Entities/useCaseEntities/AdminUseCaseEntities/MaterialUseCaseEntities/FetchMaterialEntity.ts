import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { materialOutput } from "../../../../DTO/MaterialEntities/material";

export interface IFetchMaterialUseCaseEntity {
   execute():Promise<materialOutput | commonOutput>
}