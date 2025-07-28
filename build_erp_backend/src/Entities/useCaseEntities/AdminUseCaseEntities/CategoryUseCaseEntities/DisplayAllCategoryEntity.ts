import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDisplayAllCategoryUseCase{
   execute(page:number,search:string): Promise<{getCategoryData:any[];totalPage:number } | commonOutput>
}