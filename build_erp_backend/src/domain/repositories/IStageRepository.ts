import { Stage, stageData } from "../types/Stage";

export interface IStageRepository{
   stageDataSave(projectId:string,element:Stage):Promise<void>
   findStageByprojectId(projectId:string):Promise<stageData[] | []>
   changeStageStatus(stageId:string,newProgress:number,date:string):Promise<void>
   RemoveDateinProject(_id:string):Promise<void>
   DeleteDtageByproject(_id:string):Promise<void>
   uploadImageByStageId(_id:string,url:string[] | string,date:string):Promise<void>
}