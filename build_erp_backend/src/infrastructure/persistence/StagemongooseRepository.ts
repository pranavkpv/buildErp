import { IStageRepository } from "../../domain/repositories/IStageRepository";
import { Stage, stageData } from "../../domain/types/Stage";
import ProjectModel from "../../models/ProjectModel";
import StageModel from "../../models/StageModel";

export class StagemongooseRepository implements IStageRepository {
    async stageDataSave(projectId: string, element: Stage): Promise<void> {
        const newStage = new StageModel({
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
    async findStageByprojectId(projectId: string): Promise<stageData[] | []> {
        const data = await StageModel.find({ project_id: projectId })
        return data ? data : []
    }
    async changeStageStatus(stageId: string, newProgress: number, date: string): Promise<void> {
        await StageModel.findByIdAndUpdate(stageId, { progress: newProgress, status_date: date })
    }
    async RemoveDateinProject(_id: string): Promise<void> {
        await ProjectModel.findByIdAndUpdate(_id, { start_date: null, end_date: null, budgeted_cost: null })
    }
    async DeleteDtageByproject(_id: string): Promise<void> {
        await StageModel.deleteMany({ project_id: _id })
    }
    async uploadImageByStageId(_id: string, url: string | string[], date: string): Promise<void> {
        const imageArray = Array.isArray(url) ? url : [url];

        await StageModel.findByIdAndUpdate(
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