import { commonOutput } from "../../../dto/common";
import {  editMaterialFetch } from "../../../entities/material.entity";

export interface IGetEditMaterialUseCase {
   execute(_id:string):  Promise<commonOutput<editMaterialFetch> | commonOutput>
}