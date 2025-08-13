import { IStageRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IStageRepository";
import { changeStatusInput, Stage, uploadImageInput } from "../../DTO/ProjectEntities/Stage";
import { stageDB } from "../../Database/Model/StageModel";
import { projectDB } from "../../Database/Model/ProjectModel";
import { IStageModelEntity } from "../../Entities/ModelEntities/Stage.Entity";


export class StageRepository implements IStageRepositoryEntity {

    // Save new stage data for a given project
    async stageDataSave(projectId: string, element: Stage): Promise<void> {
        const newStage = new stageDB({
            project_id: projectId,
            stage_name: element.stage_name,
            start_date: element.start_date,
            end_date: element.end_date,
            stage_per: element.stage_percentage,
            stage_amount: element.stage_amount,
            progress: 0,              // Initial progress set to 0
            status_date: element.start_date
        })
        await newStage.save()
    }

    // Find all stages by project ID
    async findStageByprojectId(projectId: string): Promise<IStageModelEntity[] | []> {
        const data = await stageDB.find({ project_id: projectId })
        return data
    }

    // Change the progress status of a stage
    async changeStageStatus(input: changeStatusInput): Promise<void> {
        const { stageId, newProgress, date } = input
        await stageDB.findByIdAndUpdate(stageId, { progress: newProgress, status_date: date })
    }

    // Remove dates and budget information from a project
    async RemoveDateinProject(_id: string): Promise<void> {
        await projectDB.findByIdAndUpdate(_id, { start_date: null, end_date: null, budgeted_cost: null })
    }

    // Delete all stages belonging to a specific project
    async DeleteDtageByproject(_id: string): Promise<void> {
        await stageDB.deleteMany({ project_id: _id })
    }

    // Upload one or multiple images for a specific stage
    async uploadImageByStageId(input: uploadImageInput): Promise<void> {
        const { _id, url, date } = input
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
