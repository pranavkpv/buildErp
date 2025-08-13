import { IAddSiteToProjectRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository";
import { projectDB } from "../../Database/Model/ProjectModel";
import { IProjectModelEntity } from "../../Entities/ModelEntities/ProjectEntity";
import { sitemanagerDB } from "../../Database/Model/SitemanagerModel";
import { ISitemanagerModelEntity } from "../../Entities/ModelEntities/Sitemanager.Entity";
import { listingInput } from "../../DTO/CommonEntities/common";

/**
 * Repository class for managing site-to-project assignments.
 * Implements methods to retrieve projects and site managers
 * based on different criteria.
 */
export class AddSiteToProjectRepository implements IAddSiteToProjectRepositoryEntity {

  /**
   * Finds projects that have an assigned site manager, with search & pagination.
   * 
   * @param input - Contains `page` for pagination and `search` for filtering.
   * @returns An object with `getAddSiteData` (list of matching projects)
   *          and `totalPage` (total matching documents).
   */
  async findProjectwithSitemanager(
    input: listingInput
  ): Promise<{ getAddSiteData: any[]; totalPage: number }> {
    
    const { page, search } = input;
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
