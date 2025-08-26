import { commonOutput } from "../../dto/common";
import { addMaterialFetch } from "../../Entities/material.entity";


export interface IDisplayAddMaterialUseCase {
   execute(): Promise<commonOutput<addMaterialFetch> | commonOutput>
}