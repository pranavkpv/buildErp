import { Stage } from "../../Input-OutputEntities/ProjectEntities/Stage";
import { IStageModelEntity } from "../../ModelEntities/Stage.Entity";

export interface IStageRepository{
   stageDataSave(projectId:string,element:Stage):Promise<void>
   findStageByprojectId(projectId:string):Promise<IStageModelEntity[] | []>
   changeStageStatus(stageId:string,newProgress:number,date:string):Promise<void>
   RemoveDateinProject(_id:string):Promise<void>
   DeleteDtageByproject(_id:string):Promise<void>
   uploadImageByStageId(_id:string,url:string[] | string,date:string):Promise<void>
}