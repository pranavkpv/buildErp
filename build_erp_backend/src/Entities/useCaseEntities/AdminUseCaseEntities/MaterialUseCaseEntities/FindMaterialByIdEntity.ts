import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { materialOutput } from "../../../../DTO/MaterialEntities/material";

export interface IFindMaterialByIdUsecaseEntity {
   execute(_id: string): Promise<materialOutput | commonOutput>
}