import { IAddSiteToProjectRepository } from "../../domain/repositories/IAddSiteToProjectRepository";
import { Project } from "../../domain/types/project";
import { Sitemanager } from "../../domain/types/sitemanager";
import ProjectModel from "../../models/ProjectModel";
import SitemanagerModel from "../../models/SitemanagerModel";

export class AddSiteToProjectmongooseRepository implements IAddSiteToProjectRepository {
   async findProjectwithSitemanager(page: number, search: string): Promise<{ getAddSiteData: any[]; totalPage: number; }> {
      const skip = page * 5
      const searchRegex = new RegExp(search, "i")
      const data = await ProjectModel.aggregate([
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

      const totalPage = await ProjectModel.countDocuments({ sitemanager_id: { $ne: null } })/5
      return {
         getAddSiteData: data,
         totalPage
      }
   }
   async findProjectWithoutSitemanager(): Promise<Project[] | null> {
      const result = await ProjectModel.find({sitemanager_id:null})
      return result ? result : null
   }
   async findSitemanagerExcludeproject(): Promise<Sitemanager[] | null> {
       const sitemanagerList =await SitemanagerModel.find()
       return sitemanagerList ? sitemanagerList : null
   }
}