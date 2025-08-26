import { commonOutput } from "../../dto/common";


export interface IDeleteLabourUseCase {
   execute(_id: string): Promise<commonOutput>
}