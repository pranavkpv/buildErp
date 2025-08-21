import { commonOutput } from "../../dto/common";
import { saveCategoryInput } from "../../entities/category.entity";

export interface ISaveCategoryUseCaseEntity{
   execute(input: saveCategoryInput): Promise<commonOutput>
}