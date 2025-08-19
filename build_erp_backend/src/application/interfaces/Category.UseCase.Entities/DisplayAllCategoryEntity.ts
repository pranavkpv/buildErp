import { commonOutput } from "../../dto/CommonEntities/common";

export interface IDisplayAllCategoryUseCaseEntity{
   execute(page:number,search:string): Promise<commonOutput>
}