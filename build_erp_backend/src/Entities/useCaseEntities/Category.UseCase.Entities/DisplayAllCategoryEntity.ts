import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IDisplayAllCategoryUseCaseEntity{
   execute(page:number,search:string): Promise<commonOutput>
}