import { commonOutput } from '../../dto/common';
import { addMaterialFetch } from '../../entities/material.entity';


export interface IDisplayAddMaterialUseCase {
   execute(): Promise<commonOutput<addMaterialFetch> | commonOutput>
}