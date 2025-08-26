import { commonOutput } from "../../dto/common";


export interface IdeleteUnitUseCase {
   execute(_id:string): Promise<commonOutput>
}