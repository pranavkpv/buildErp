import { commonOutput } from '../../dto/common';


export interface ISendEstimationUseCase {
   execute(id:string):Promise<commonOutput>
}