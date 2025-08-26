import { commonOutput } from "../../dto/common";


export interface IDeleteMaterialUseCase {
   execute(_id:string): Promise<commonOutput>
}