import { commonOutput } from "../../../dto/common";
import { editMaterialInput } from "../../../entities/material.entity";

export interface IUpdateMaterialUseCase {
   execute(input: editMaterialInput): Promise<commonOutput>
}