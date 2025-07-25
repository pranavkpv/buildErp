import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IFetchProjectUseCase {
    axecute():Promise<IProjectModelEntity[]>
}