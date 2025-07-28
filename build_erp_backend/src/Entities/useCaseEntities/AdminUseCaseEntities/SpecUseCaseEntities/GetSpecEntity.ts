import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { ISpecModelEntity } from "../../../ModelEntities/Spec.Entity";

export interface IgetSpecUseCase {
   execute():Promise<ISpecModelEntity[] | commonOutput>
}