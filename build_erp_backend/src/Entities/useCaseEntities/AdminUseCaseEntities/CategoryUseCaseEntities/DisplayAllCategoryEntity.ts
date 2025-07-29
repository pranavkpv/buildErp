import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { CategoryOutput } from "../../../Input-OutputEntities/MaterialEntities/category";

export interface IDisplayAllCategoryUseCase{
   execute(page:number,search:string): Promise<CategoryOutput | commonOutput>
}