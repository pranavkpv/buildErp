import { Stage, stageData } from "../types/Stage";

export interface IStageRepository{
   stageDataSave(projectId:string,element:Stage):Promise<void>
   findStageByprojectId(projectId:string):Promise<stageData[] | []>
   changeStageStatus(stageId:string,newStatus:string,date:string):Promise<void>
   RemoveDateinProject(_id:string):Promise<void>
   DeleteDtageByproject(_id:string):Promise<void>
}