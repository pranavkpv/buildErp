import { commonOutput } from '../../dto/common';


export interface IChangeStatusUseCase {
   execute(id:string,status:string): Promise<commonOutput>
}