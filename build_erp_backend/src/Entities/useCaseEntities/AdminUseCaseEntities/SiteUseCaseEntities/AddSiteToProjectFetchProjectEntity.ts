import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IAddSiteToprojectFetchProjectUseCase {
   execute(): Promise<IProjectModelEntity[] | null | commonOutput>
}