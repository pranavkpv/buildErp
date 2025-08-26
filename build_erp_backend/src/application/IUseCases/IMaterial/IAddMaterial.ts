import { commonOutput } from "../../dto/common";
import { addMaterialInput } from "../../Entities/material.entity";

export interface IAddMaterialUseCase {
   execute(input: addMaterialInput): Promise<commonOutput>
}