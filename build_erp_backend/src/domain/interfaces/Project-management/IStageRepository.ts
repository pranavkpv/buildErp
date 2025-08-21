import { changeStatusInput } from "../../../application/entities/sitemanager.entity";
import { stage, uploadImageInput } from "../../../application/entities/stage.entity";
import { IStageModelEntity } from "../../Entities/modelEntities/stage.entity";

export interface IStageRepository {
   findStageByprojectId(projectId: string): Promise<IStageModelEntity[] | []>
   stageDataSave(projectId: string, element: stage): Promise<void>
   changeStageStatus(input: changeStatusInput): Promise<void>
   RemoveDateinProject(_id: string): Promise<void>
   DeleteStageByproject(_id: string): Promise<void>
   uploadImageByStageId(input: uploadImageInput): Promise<void>
}