import { commonOutput } from '../../dto/common';


export interface IDeletePurchaseUseCase {
   execute(id: string): Promise<commonOutput>
}