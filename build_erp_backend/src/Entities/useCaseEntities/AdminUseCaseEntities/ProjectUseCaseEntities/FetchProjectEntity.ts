import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IFetchProjectUseCase {
    axecute():Promise<IProjectModelEntity[] | commonOutput>
}