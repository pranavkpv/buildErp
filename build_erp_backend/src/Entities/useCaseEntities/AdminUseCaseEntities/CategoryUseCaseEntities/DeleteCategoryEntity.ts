import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteCategoryUseCase{
   execute(_id:string): Promise<commonOutput> 
}