import { changeStatusInput, Stage, uploadImageInput } from "../../../DTO/ProjectEntities/Stage";
import { IStageModelEntity } from "../../ModelEntities/Stage.Entity";

export interface IStageRepositoryEntity{
   stageDataSave(projectId:string,element:Stage):Promise<void>
   findStageByprojectId(projectId:string):Promise<IStageModelEntity[] | []>
   changeStageStatus(input:changeStatusInput):Promise<void>
   RemoveDateinProject(_id:string):Promise<void>
   DeleteDtageByproject(_id:string):Promise<void>
   uploadImageByStageId(input:uploadImageInput):Promise<void>
}