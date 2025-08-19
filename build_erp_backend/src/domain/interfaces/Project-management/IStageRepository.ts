import { IStageModelEntity } from "../../Entities/modelEntities/stage.entity";

export interface IStageRepository {
   findStageByprojectId(projectId: string): Promise<IStageModelEntity[] | []>


   stageDataSave(projectId: string, element: Stage): Promise<void>
   changeStageStatus(input: changeStatusInput): Promise<void>
   RemoveDateinProject(_id: string): Promise<void>
   DeleteDtageByproject(_id: string): Promise<void>
   uploadImageByStageId(input: uploadImageInput): Promise<void>
}