import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { addMaterialInput } from "../../../../DTO/MaterialEntities/material";

export interface IAddMaterialUseCaseEntity{
   execute(input: addMaterialInput): Promise<commonOutput>
}