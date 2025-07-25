import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { editCategoryInput } from "../../../Input-OutputEntities/MaterialEntities/category";

export interface IUpdateCategoryUseCase{
   execute(input: editCategoryInput): Promise<commonOutput>
}