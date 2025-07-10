import { IprojectRepository } from "../../domain/repositories/IProjectRepository";
import { projectWithSitemanager } from "../../domain/types/addSite";
import { getProjectListData, Project } from "../../domain/types/project";
import ProjectModel from "../../models/ProjectModel";


export class ProjectmongooseRepository implements IprojectRepository {
   async findAllProjectWithUser(page: number, search: string): Promise<{ getProjectListData: any[]; totalPage: number }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const projectData = await ProjectModel.aggregate([
         {
            $addFields: {
               userObjectId: { $toObjectId: "$user_id" }
            }
         }, {
            $lookup: {
               from: "users",
               localField: "userObjectId",
               foreignField: "_id",
               as: "userDetails"
            }
         }, {
            $match: {
               $or: [
                  { project_name: { $regex: searchRegex } },
                  { "userDetails.username": { $regex: searchRegex } }
               ]
            }
         },
         { $skip: skip }, { $limit: 5 }])
      const totalPage = await ProjectModel.countDocuments() / 5

      return {
         getProjectListData: projectData || [],
         totalPage
      };
   }
   async findProjectByName(project_name: string): Promise<Project | null> {
      const existProject = await ProjectModel.findOne({
         project_name: { $regex: new RegExp(`^${ project_name }$`, 'i') }
      });

      return existProject ? existProject : null
   }
   async saveProject(project_name: string, user_id: string, address: string, mobile_number: number, email: string, area: string, description: string, status: string): Promise<void> {
      const newProject = new ProjectModel({
         project_name,
         user_id,
         address,
         mobile_number,
         email,
         area,
         description,
         status: "pending"
      })
      await newProject.save()
   }
   async findProjectInEdit(_id: string, project_name: string): Promise<Project | null> {
      const existProject = await ProjectModel.findOne({ _id: { $ne: _id }, project_name: { $regex: new RegExp(`^${ project_name }$`, 'i') } })
      return existProject ? existProject : null
   }
   async UpdateProjectById(_id: string, project_name: string, user_id: string, address: string, mobile_number: number, email: string, area: number, description: string): Promise<void> {
      await ProjectModel.findByIdAndUpdate(_id, { project_name, user_id, address, mobile_number, email, area, description })
   }
   async DeleteProjectById(_id: string): Promise<void> {
      await ProjectModel.findByIdAndDelete(_id)
   }
   async changeProjectStatus(_id: string, status: string): Promise<void> {
      await ProjectModel.findByIdAndUpdate(_id, { status })
   }
   async addSitemanagerToProject(_id: string, siteManager_id: string): Promise<void> {
      await ProjectModel.findByIdAndUpdate(_id, { $set: { sitemanager_id: siteManager_id } })
   }
   async removeSitemanagerInProject(_id: string, sitemanager_id: string): Promise<void> {
      await ProjectModel.findByIdAndUpdate(_id, { sitemanager_id: null })
   }
   async fetchProject(): Promise<Project[]> {
      const x = await ProjectModel.find()
      return x
   }
   async findProjectWithCost(projectId: string): Promise<Project | null> {
      const existStage = await ProjectModel.findOne({ _id: projectId})
      return existStage ? existStage : null
   }
   async SetCostInProject(projectId: string, startDate: string, endDate: string, cost: number): Promise<void> {
      await ProjectModel.findByIdAndUpdate(projectId, { start_date: startDate, end_date: endDate, budgeted_cost: cost })
   }
   async findStageSetProject(search:string,page:number): Promise<{data:Project[],totalPage:number}> {
      const skip = page*5
      const existStage = await ProjectModel.find({ budgeted_cost: { $ne: null } ,project_name:{$regex:search,$options:"i"}}).skip(skip).limit(5)
      const totalPage = Math.ceil(await ProjectModel.countDocuments({project_name:{$regex:search,$options:"i"}})/5)
      return {data:existStage,totalPage:totalPage} 
   }
   async UpdateEstimationImage(url: string, _id: string):Promise<void> {
       await ProjectModel.findByIdAndUpdate(_id,{expected_image:url})
   }
   async findProjectByUserId(user_id: string): Promise<Project[]> {
       const data = await ProjectModel.find({user_id:user_id})
       return data 
   }
   async findSitemanagerProject(user: string): Promise<Project[]> {
       const data = await ProjectModel.find({sitemanager_id:user})
       return data
   }
}