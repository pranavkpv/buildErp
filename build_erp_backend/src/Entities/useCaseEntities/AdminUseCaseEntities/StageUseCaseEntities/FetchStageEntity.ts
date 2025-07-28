import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IFetchStageUsecase {
   execute(search:string,page:number):Promise<{data:IProjectModelEntity[],totalPage:number} | commonOutput>
}