import { stageDB } from '../../api/models/StageModel';
import { projectDB } from '../../api/models/ProjectModel';
import { IStageModelEntity } from '../../domain/Entities/modelEntities/stage.entity';
import { IStageRepository } from '../../domain/Entities/IRepository/IStage';
import { stage, stageWithAggregateProject, uploadImageInput } from '../../application/Entities/stage.entity';
import { changeStatusInput } from '../../application/Entities/sitemanager.entity';


export class StageRepository implements IStageRepository {

    // Save new stage data for a given project
    async stageDataSave(projectId: string, element: stage): Promise<void> {
        const newStage = new stageDB({
            project_id: projectId,
            stage_name: element.stage_name,
            start_date: element.start_date,
            end_date: element.end_date,
            stage_per: element.stage_percentage,
            stage_amount: element.stage_amount,
            progress: 0,
            status_date: element.status_date,
        });
        await newStage.save();
    }

    // Find all stages by project ID
    async findStageByprojectId(projectId: string): Promise<IStageModelEntity[] | []> {
        const data = await stageDB.find({ project_id: projectId });
        return data;
    }

    // Change the progress status of a stage
    async changeStageStatus(input: changeStatusInput): Promise<void> {
        const { stageId, newProgress, date } = input;
        await stageDB.findByIdAndUpdate(stageId, { progress: newProgress, status_date: date });
    }

    // Remove dates and budget information from a project
    async RemoveDateinProject(id: string): Promise<void> {
        await projectDB.findByIdAndUpdate(id, { start_date: null, end_date: null, budgeted_cost: null });
    }

    // Delete all stages belonging to a specific project
    async DeleteStageByproject(id: string): Promise<void> {
        await stageDB.deleteMany({ project_id: id });
    }

    // Upload one or multiple images for a specific stage
    async uploadImageByStageId(input: uploadImageInput): Promise<void> {
        const { _id, url, date } = input;
        const imageArray = Array.isArray(url) ? url : [url];

        await stageDB.findByIdAndUpdate(
            _id,
            {
                $push: {
                    stage_image: {
                        date: date,
                        image: imageArray,
                    },
                },
            },
        );
    }
    async getAggregateStageByProjectIdmatchSitemanager(sitemanagerId: string, page: number, search: string):
        Promise<{data:stageWithAggregateProject[],totalPages:number}> {
        const skip = page * 5;
        const data = await stageDB.aggregate([
            {
                $addFields: {
                    projectObjectId: { $toObjectId: '$project_id' },
                },
            }, {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            }, { $unwind: '$projectDetails' },
            {
                $match: {
                    'projectDetails.sitemanager_id': sitemanagerId,
                    'projectDetails.project_name': { $regex: search, $options: 'i' },
                },
            }, {
                $group: {
                    _id: '$project_id',
                    count: { $sum: 1 },
                    completion_per: { $sum: '$progress' },
                    project_name: { $first: '$projectDetails.project_name' },
                    start_date: { $first: '$projectDetails.start_date' },
                    end_date: { $first: '$projectDetails.end_date' },
                },
            },{ $skip:skip },{ $limit:5 },
        ]);
        const totalDoc = await stageDB.aggregate([
            {
                $addFields: {
                    projectObjectId: { $toObjectId: '$project_id' },
                },
            }, {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            }, { $unwind: '$projectDetails' },
            {
                $match: {
                    'projectDetails.sitemanager_id': sitemanagerId,
                    'projectDetails.project_name': { $regex: search, $options: 'i' },
                },
            }, {
                $group: {
                    _id: '$project_id',
                    count: { $sum: 1 },
                    completion_per: { $sum: '$progress' },
                    project_name: { $first: '$projectDetails.project_name' },
                    start_date: { $first: '$projectDetails.start_date' },
                    end_date: { $first: '$projectDetails.end_date' },
                },
            },
        ]);
        return {
            data,
            totalPages:Math.ceil(totalDoc.length),
        };
    }
}
