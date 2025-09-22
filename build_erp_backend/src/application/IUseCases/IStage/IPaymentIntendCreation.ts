import { commonOutput } from '../../dto/common';

export interface IPaymentIntendCreationUseCase {
   execute(stageId:string,stageAmount:number):Promise<commonOutput<string> | commonOutput>
}