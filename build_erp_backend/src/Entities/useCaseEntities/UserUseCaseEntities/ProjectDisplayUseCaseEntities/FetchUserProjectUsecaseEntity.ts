import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IFetchUserProjectUseCase {
   execute(user:string):Promise<IProjectModelEntity[] | commonOutput >
}