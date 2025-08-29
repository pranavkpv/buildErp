import { commonOutput } from '../../dto/common';


export interface IDeleteMaterialUseCase {
   execute(id:string): Promise<commonOutput>
}