import { commonOutput } from '../../dto/common';


export interface IDeleteEstimationUseCase {
   execute(id:string):Promise<commonOutput>
}