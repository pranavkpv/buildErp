import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IDeleteCategoryUseCaseEntity{
   execute(_id:string): Promise<commonOutput> 
}