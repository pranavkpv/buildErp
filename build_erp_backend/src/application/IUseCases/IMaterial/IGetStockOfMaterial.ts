import { commonOutput } from '../../dto/common';
import { stockDTO } from '../../dto/material.dto';

export interface IGetStockOfMaterialUseCase {
   execute(projectId: string, material: string, page: number, id: string):
      Promise<commonOutput<{ data: stockDTO[], totalPage: number }>>
}