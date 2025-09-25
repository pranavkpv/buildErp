import { commonOutput } from '../../dto/common';
import { addMaterialInput } from '../../entities/material.entity';

export interface IAddMaterialUseCase {
   execute(input: addMaterialInput): Promise<commonOutput>
}