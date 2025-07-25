import { IAddSiteToProjectRepository } from "../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository";
import { projectDB } from "../../Database/Model/ProjectModel";
import { IProjectModelEntity } from "../../Entities/ModelEntities/ProjectEntity";
import { sitemanagerDB } from "../../Database/Model/SitemanagerModel";
import { ISitemanagerModelEntity } from "../../Entities/ModelEntities/Sitemanager.Entity";


export class AddSiteToProjectRepository implements IAddSiteToProjectRepository {
   async findProjectwithSitemanager(page: number, search: string): Promise<{ getAddSiteData: any[]; totalPage: number; }> {
      const skip = page * 5
      const searchRegex = new RegExp(search, "i")
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

      const totalPage = await projectDB.countDocuments({ sitemanager_id: { $ne: null } })/5
      return {
         getAddSiteData: data,
         totalPage
      }
   }
   async findProjectWithoutSitemanager(): Promise<IProjectModelEntity[] | []> {
      const result = await projectDB.find({sitemanager_id:null})
      return result 
   }
   async findSitemanagerExcludeproject(): Promise<ISitemanagerModelEntity[] | []> {
       const sitemanagerList =await sitemanagerDB.find()
       return sitemanagerList 
   }
}