import { commonOutput } from "../../dto/common";


export interface IChangeStatusUseCase {
   execute(_id:string,status:string): Promise<commonOutput>
}