import { IAddSiteToProjectRepository } from '../../domain/Entities/IRepository/IAddSiteToProject';
import { projectDB } from '../../api/models/ProjectModel';
import { IProjectModelEntity } from '../../domain/Entities/modelEntities/project.entity';
import { sitemanagerDB } from '../../api/models/SitemanagerModel';
import { ISitemanagerModelEntity } from '../../domain/Entities/modelEntities/sitemanager.entity';
import { listAddSiteToproject } from '../../application/Entities/addsitemanagertoproject.entity';

export class AddSiteToProjectRepository implements IAddSiteToProjectRepository {
    // Get projects that already have a site manager with pagination and search
    async getProjectsWithSiteManager(page: number, search: string):
    Promise<{ getAddSiteData: listAddSiteToproject[]; totalPage: number }> {

        const skip = page * 5;
        const searchRegex = new RegExp(search, 'i');


        const data = await projectDB.aggregate([
            {
                $match: {
                    sitemanager_id: { $ne: null },
                },
            },
            {
                $addFields: {
                    sitemanagerObjectId: { $toObjectId: '$sitemanager_id' },
                },
            },
            {
                $lookup: {
                    from: 'sitemanagers',
                    localField: 'sitemanagerObjectId',
                    foreignField: '_id',
                    as: 'sitemanagerDetails',
                },
            },
            {
                $match: {
                    $or: [
                        { project_name: { $regex: searchRegex } },
                        { 'sitemanagerDetails.username': { $regex: searchRegex } },
                    ],
                },
            },
            { $skip: skip },
            { $limit: 5 },
        ]);


        const totalDoc = await projectDB.aggregate([
            {
                $match: {
                    sitemanager_id: { $ne: null },
                },
            },
            {
                $addFields: {
                    sitemanagerObjectId: { $toObjectId: '$sitemanager_id' },
                },
            },
            {
                $lookup: {
                    from: 'sitemanagers',
                    localField: 'sitemanagerObjectId',
                    foreignField: '_id',
                    as: 'sitemanagerDetails',
                },
            },
            {
                $match: {
                    $or: [
                        { project_name: { $regex: searchRegex } },
                        { 'sitemanagerDetails.username': { $regex: searchRegex } },
                    ],
                },
            },
        ]);

        return {
            getAddSiteData: data,
            totalPage: Math.ceil(totalDoc.length /5),
        };
    }

    // Get all projects that do not have a site manager assigned
    async getProjectsWithoutSiteManager(): Promise<IProjectModelEntity[] | []> {
        return await projectDB.find({ sitemanager_id: null,status:'processing' });
    }

    async getUnassignedSiteManagers(): Promise<ISitemanagerModelEntity[] | []> {
        return await sitemanagerDB.find();
    }
}
