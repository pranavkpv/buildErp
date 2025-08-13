import { commonOutput } from "../../../DTO/CommonEntities/common";
import { ICategoryModelEntity } from "../../ModelEntities/Category.Entity";

export interface ISaveCategoryUseCaseEntity{
   execute(input: ICategoryModelEntity): Promise<commonOutput>
}