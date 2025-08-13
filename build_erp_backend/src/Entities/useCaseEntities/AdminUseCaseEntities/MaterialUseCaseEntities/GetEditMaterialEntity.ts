import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { materialOutput } from "../../../../DTO/MaterialEntities/material";

export interface IGetEditMaterialUseCaseEntity {
   execute(_id:string): Promise<materialOutput | commonOutput>
}