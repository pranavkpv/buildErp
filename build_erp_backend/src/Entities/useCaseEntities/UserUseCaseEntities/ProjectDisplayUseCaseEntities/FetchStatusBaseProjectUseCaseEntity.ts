import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IFetchStatusBaseProjectUseCase {
   execute(status: string, search: string, area: number, page: number): Promise<{ data: IProjectModelEntity[], totalPage: number, areas: number[] } | commonOutput>
}