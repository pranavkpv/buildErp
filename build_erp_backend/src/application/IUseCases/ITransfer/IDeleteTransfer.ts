import { commonOutput } from '../../dto/common';


export interface IDeleteTransferUseCase {
   execute(id:string):Promise<commonOutput>
}