import { commonOutput } from '../../dto/common';


export interface IDeleteProjectUseCase {
   execute(id:string): Promise<commonOutput>
}