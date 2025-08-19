import { IAddSiteToProjectRepository } from "../../domain/interfaces/Site-management/IAddSiteToProjectRepository";
import { projectDB } from "../../api/models/ProjectModel";
import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity";
import { sitemanagerDB } from "../../api/models/SitemanagerModel";
import { ISitemanagerModelEntity } from "../../domain/Entities/modelEntities/sitemanager.entity";
import { listAddSiteToproject } from "../../application/entities/addsitemanagertoproject.entity";

export class AddSiteToProjectRepository implements IAddSiteToProjectRepository {
  async findProjectwithSitemanager(page:number,search:string): Promise<{ getAddSiteData: listAddSiteToproject[]; totalPage: number }> {
    
    const skip = page * 5;
    const searchRegex = new RegExp(search, "i");

    
    const data = await projectDB.aggregate([
      {
        $match: {
          sitemanager_id: { $ne: null }
        }
      },
      {
        $addFields: {
          sitemanagerObjectId: { $toObjectId: "$sitemanager_id" }
        }
      },
      {
        $lookup: {
          from: "sitemanagers",
          localField: "sitemanagerObjectId",
          foreignField: "_id",
          as: "sitemanagerDetails"
        }
      },
      {
        $match: {
          $or: [
            { project_name: { $regex: searchRegex } },
            { "sitemanagerDetails.username": { $regex: searchRegex } }
          ]
        }
      },
      { $skip: skip },
      { $limit: 5 }
    ]);


    const totalDoc = await projectDB.aggregate([
      {
        $match: {
          sitemanager_id: { $ne: null }
        }
      },
      {
        $addFields: {
          sitemanagerObjectId: { $toObjectId: "$sitemanager_id" }
        }
      },
      {
        $lookup: {
          from: "sitemanagers",
          localField: "sitemanagerObjectId",
          foreignField: "_id",
          as: "sitemanagerDetails"
        }
      },
      {
        $match: {
          $or: [
            { project_name: { $regex: searchRegex } },
            { "sitemanagerDetails.username": { $regex: searchRegex } }
          ]
        }
      }
    ]);

    return {
      getAddSiteData: data,
      totalPage: totalDoc.length
    };
  }

  /**
   * Finds all projects that do not have an assigned site manager.
   * 
   * @returns An array of projects without a site manager.
   */
  async findProjectWithoutSitemanager(): Promise<IProjectModelEntity[] | []> {
    return await projectDB.find({ sitemanager_id: null });
  }

  /**
   * Retrieves all site managers (without any filtering).
   * 
   * @returns An array of site manager documents.
   */
  async findSitemanagerExcludeproject(): Promise<ISitemanagerModelEntity[] | []> {
    return await sitemanagerDB.find();
  }
}
