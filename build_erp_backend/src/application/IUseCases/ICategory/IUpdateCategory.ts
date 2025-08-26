import { commonOutput } from "../../dto/common";
import { saveCategoryInput } from "../../Entities/category.entity";

export interface IUpdateCategoryUseCase {
   execute(input: saveCategoryInput):
      Promise<commonOutput>
}