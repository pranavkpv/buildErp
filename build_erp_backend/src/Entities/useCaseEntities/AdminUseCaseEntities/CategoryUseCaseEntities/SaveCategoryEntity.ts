import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { addcategoryInput } from "../../../Input-OutputEntities/MaterialEntities/category";

export interface ISaveCategoryUseCase{
   execute(input: addcategoryInput): Promise<commonOutput>
}