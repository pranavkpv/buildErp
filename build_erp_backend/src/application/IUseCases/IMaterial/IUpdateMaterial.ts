import { commonOutput } from '../../dto/common';
import { editMaterialInput } from '../../Entities/material.entity';

export interface IUpdateMaterialUseCase {
   execute(input: editMaterialInput): Promise<commonOutput>
}