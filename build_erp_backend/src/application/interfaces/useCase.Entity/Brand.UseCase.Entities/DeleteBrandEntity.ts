import { commonOutput } from "../../../dto/common";


export interface IDeleteBrandUsecase{
   execute(_id:string): Promise<commonOutput>
}