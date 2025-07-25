import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IFetchUserProjectUseCase {
   execute(user:string):Promise<IProjectModelEntity[]>
}