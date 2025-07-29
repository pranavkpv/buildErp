import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IFindMaterialByIdUsecase {
   execute(_id: string): Promise<materialOutput | commonOutput>
}