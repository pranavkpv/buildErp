import { commonOutput } from '../../dto/common';

export interface IUpdateBrandUseCase {
   execute(id: string, brandName: string):
      Promise<commonOutput>
}