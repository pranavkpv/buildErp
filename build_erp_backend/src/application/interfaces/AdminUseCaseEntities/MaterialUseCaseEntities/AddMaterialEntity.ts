import { commonOutput } from "../../../dto/CommonEntities/common";
import { addMaterialInput } from "../../../dto/MaterialEntities/material";

export interface IAddMaterialUseCaseEntity{
   execute(input: addMaterialInput): Promise<commonOutput>
}