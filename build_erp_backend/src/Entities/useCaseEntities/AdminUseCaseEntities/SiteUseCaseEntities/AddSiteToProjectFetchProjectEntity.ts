import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IAddSiteToprojectFetchProjectUseCase {
   execute(): Promise<IProjectModelEntity[] | null >
}