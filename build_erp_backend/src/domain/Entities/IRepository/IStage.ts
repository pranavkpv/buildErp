import { changeStatusInput } from '../../../application/Entities/sitemanager.entity';
import { stage, stageWithAggregateProject, uploadImageInput } from '../../../application/Entities/stage.entity';
import { IStageModelEntity } from '../modelEntities/stage.entity';

export interface IStageRepository {
   stageDataSave(projectId: string, element: stage):
      Promise<void>

   findStageByprojectId(projectId: string):
      Promise<IStageModelEntity[] | []>

   changeStageStatus(input: changeStatusInput):
      Promise<void>

   RemoveDateinProject(id: string):
      Promise<void>

   DeleteStageByproject(id: string):
      Promise<void>

   uploadImageByStageId(input: uploadImageInput):
      Promise<void>

   getAggregateStageByProjectIdmatchSitemanager(sitemanagerId: string,page:number,search:string):
      Promise<{data:stageWithAggregateProject[],totalPages:number}>
}