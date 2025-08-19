import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialOutput } from "../../../dto/MaterialEntities/material";

export interface IFindMaterialByIdUsecaseEntity {
   execute(_id: string): Promise<materialOutput | commonOutput>
}