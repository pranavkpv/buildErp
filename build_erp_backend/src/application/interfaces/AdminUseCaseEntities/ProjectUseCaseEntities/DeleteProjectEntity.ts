import { commonOutput } from "../../../dto/common";


export interface IDeleteProjectUseCase {
   execute(_id:string): Promise<commonOutput>
}