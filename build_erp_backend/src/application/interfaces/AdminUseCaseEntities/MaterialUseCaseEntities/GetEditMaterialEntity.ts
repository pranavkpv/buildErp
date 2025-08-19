import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialOutput } from "../../../dto/MaterialEntities/material";

export interface IGetEditMaterialUseCaseEntity {
   execute(_id:string): Promise<materialOutput | commonOutput>
}