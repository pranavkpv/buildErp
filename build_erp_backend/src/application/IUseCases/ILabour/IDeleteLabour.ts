import { commonOutput } from '../../dto/common';


export interface IDeleteLabourUseCase {
   execute(id: string): Promise<commonOutput>
}