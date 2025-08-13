import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { editMaterialInput } from "../../../../DTO/MaterialEntities/material";

export interface IUpdateMaterialUseCaseEntity {
   execute(input: editMaterialInput): Promise<commonOutput>
}