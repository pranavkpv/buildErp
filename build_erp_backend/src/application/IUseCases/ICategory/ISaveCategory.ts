import { commonOutput } from "../../dto/common";
import { saveCategoryInput } from "../../Entities/category.entity";

export interface ISaveCategoryUseCase {
   execute(input: saveCategoryInput):
      Promise<commonOutput>
}