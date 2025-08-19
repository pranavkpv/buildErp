import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialOutput } from "../../../dto/MaterialEntities/material";

export interface IFetchMaterialUseCaseEntity {
   execute():Promise<materialOutput | commonOutput>
}