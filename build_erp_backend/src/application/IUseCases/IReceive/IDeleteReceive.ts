import { commonOutput } from '../../dto/common';

export interface IDeleteReceiveUseCase {
   execute(id: string): Promise<commonOutput>
}