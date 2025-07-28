import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IListProjectUseCase {
   execute(user:string):Promise<IProjectModelEntity[] | commonOutput>
}