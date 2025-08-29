import { commonOutput } from '../../dto/common';


export interface IDeleteCategoryUseCase {
   execute(id: string):
      Promise<commonOutput>
}