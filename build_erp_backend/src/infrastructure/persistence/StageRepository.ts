import { IStageRepository } from "../../Entities/repositoryEntities/Project-management/IStageRepository";
import { Stage, stageData } from "../../Entities/Input-OutputEntities/ProjectEntities/Stage";
import { stageDB } from "../../Database/Model/StageModel";
import { projectDB } from "../../Database/Model/ProjectModel";
import { IStageModelEntity } from "../../Entities/ModelEntities/Stage.Entity";


export class StageRepository implements IStageRepository {
    async stageDataSave(projectId: string, element: Stage): Promise<void> {
        const newStage = new stageDB({
            project_id: projectId,
            stage_name: element.stage_name,
            start_date: element.start_date,
            end_date: element.end_date,
            stage_per: element.stage_percentage,
            stage_amount: element.stage_amount,
            progress: 0,
            status_date: element.start_date
        })
        await newStage.save()
    }
    async findStageByprojectId(projectId: string): Promise<IStageModelEntity[] | []> {
        const data = await stageDB.find({ project_id: projectId })
        return data 
    }
    async changeStageStatus(stageId: string, newProgress: number, date: string): Promise<void> {
        await stageDB.findByIdAndUpdate(stageId, { progress: newProgress, status_date: date })
    }
    async RemoveDateinProject(_id: string): Promise<void> {
        await projectDB.findByIdAndUpdate(_id, { start_date: null, end_date: null, budgeted_cost: null })
    }
    async DeleteDtageByproject(_id: string): Promise<void> {
        await stageDB.deleteMany({ project_id: _id })
    }
    async uploadImageByStageId(_id: string, url: string | string[], date: string): Promise<void> {
        const imageArray = Array.isArray(url) ? url : [url];

        await stageDB.findByIdAndUpdate(
            _id,
            {
                $push: {
                    stage_image: {
                        date: date,
                        image: imageArray
                    }
                }
            }
        );
    }
   

}