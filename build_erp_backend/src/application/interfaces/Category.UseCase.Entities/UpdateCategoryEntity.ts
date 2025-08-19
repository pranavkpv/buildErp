import { commonOutput } from "../../dto/CommonEntities/common";
import { ICategoryModelEntity } from "../../../domain/Entities/modelEntities/category.entity";

export interface IUpdateCategoryUseCaseEntity{
   execute(input: ICategoryModelEntity): Promise<commonOutput>
}