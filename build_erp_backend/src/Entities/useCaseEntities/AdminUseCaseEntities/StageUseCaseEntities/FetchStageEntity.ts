import { IProjectModelEntity } from "../../../ModelEntities/ProjectEntity";

export interface IFetchStageUsecase {
   execute(search:string,page:number):Promise<{data:IProjectModelEntity[],totalPage:number}>
}