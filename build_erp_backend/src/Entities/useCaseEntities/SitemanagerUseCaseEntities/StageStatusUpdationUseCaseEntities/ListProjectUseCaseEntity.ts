import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IListProjectUseCase {
   execute(user:string):Promise<IProjectModelEntity[]>
}