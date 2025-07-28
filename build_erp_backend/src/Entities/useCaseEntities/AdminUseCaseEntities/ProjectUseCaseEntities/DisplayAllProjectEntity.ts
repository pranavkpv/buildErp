import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDisplayAllProjectUseCase {
   execute(page:number,search:string): Promise<{getProjectListData:any[];totalPage:number } | commonOutput>
}