import { commonOutput } from '../../dto/common';


export interface IDeleteBrandUsecase {
   execute(id: string):
      Promise<commonOutput>
}