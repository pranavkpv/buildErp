import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { addMaterialInput } from "../../../Input-OutputEntities/MaterialEntities/material";

export interface IAddMaterialUseCase{
   execute(input: addMaterialInput): Promise<commonOutput>
}