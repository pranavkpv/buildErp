import { commonOutput } from '../../dto/common';


export interface IDeleteStageUseCase {
   execute(id:string):Promise<commonOutput>
}