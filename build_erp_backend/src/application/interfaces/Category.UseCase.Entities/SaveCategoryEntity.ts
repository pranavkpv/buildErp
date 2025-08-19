import { commonOutput } from "../../dto/CommonEntities/common";
import { ICategoryModelEntity } from "../../../domain/Entities/modelEntities/category.entity";

export interface ISaveCategoryUseCaseEntity{
   execute(input: ICategoryModelEntity): Promise<commonOutput>
}