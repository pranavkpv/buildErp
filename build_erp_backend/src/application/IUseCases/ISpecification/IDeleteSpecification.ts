import { commonOutput } from '../../dto/common';


export interface IDeleteSpecUseCase {
   execute(_id:string):Promise<commonOutput>
}