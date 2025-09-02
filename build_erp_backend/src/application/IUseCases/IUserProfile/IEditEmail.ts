import { commonOutput } from "../../dto/common";

export interface IEditEmailUseCase {
   execute( email: string,id:string): Promise<commonOutput>
}