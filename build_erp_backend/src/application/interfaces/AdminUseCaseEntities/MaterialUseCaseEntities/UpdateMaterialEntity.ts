import { commonOutput } from "../../../dto/CommonEntities/common";
import { editMaterialInput } from "../../../dto/MaterialEntities/material";

export interface IUpdateMaterialUseCaseEntity {
   execute(input: editMaterialInput): Promise<commonOutput>
}