import { commonOutput } from '../../dto/common';
import { materialSumInput } from '../../Entities/material.entity';


export interface IFindmaterialSumUseCase {
   execute(input: materialSumInput[]):
      Promise<commonOutput<number> | commonOutput>
}