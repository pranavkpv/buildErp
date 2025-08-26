import { commonOutput } from "../../dto/common";


export interface IDeleteTransferUseCase {
   execute(_id:string):Promise<commonOutput>
}