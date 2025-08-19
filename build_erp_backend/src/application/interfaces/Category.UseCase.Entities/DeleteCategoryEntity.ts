import { commonOutput } from "../../dto/CommonEntities/common";

export interface IDeleteCategoryUseCaseEntity{
   execute(_id:string): Promise<commonOutput> 
}