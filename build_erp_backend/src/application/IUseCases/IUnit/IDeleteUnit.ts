import { commonOutput } from '../../dto/common';


export interface IdeleteUnitUseCase {
   execute(id:string): Promise<commonOutput>
}