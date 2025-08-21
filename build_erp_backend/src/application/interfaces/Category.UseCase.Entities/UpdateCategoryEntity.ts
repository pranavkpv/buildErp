import { commonOutput } from "../../dto/common";
import { saveCategoryInput } from "../../entities/category.entity";

export interface IUpdateCategoryUseCase {
   execute(input: saveCategoryInput): Promise<commonOutput>
}