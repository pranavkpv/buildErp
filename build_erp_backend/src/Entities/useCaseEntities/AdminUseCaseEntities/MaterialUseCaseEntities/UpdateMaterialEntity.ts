import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { editMaterialInput } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IUpdateMaterialUseCase {
   execute(input: editMaterialInput): Promise<commonOutput>
}