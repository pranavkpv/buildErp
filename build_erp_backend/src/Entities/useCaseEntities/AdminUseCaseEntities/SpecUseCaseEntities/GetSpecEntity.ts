import { ISpecModelEntity } from "../../../ModelEntities/Spec.Entity";

export interface IgetSpecUseCase {
   execute():Promise<ISpecModelEntity[]>
}