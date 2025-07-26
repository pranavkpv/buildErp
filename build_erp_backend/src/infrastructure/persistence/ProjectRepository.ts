import { IprojectRepository } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { projectDB } from "../../Database/Model/ProjectModel";
import { IProjectModelEntity } from "../../Entities/ModelEntities/ProjectEntity";



export class ProjectRepository implements IprojectRepository {
   async findAllProjectWithUser(page: number, search: string): Promise<{ getProjectListData: any[]; totalPage: number }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const projectData = await projectDB.aggregate([
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

      const totalDoc =await projectDB.aggregate([
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
         }])

      return {
         getProjectListData: projectData || [],
         totalPage:totalDoc.length
      };
   }
   async findProjectByName(project_name: string): Promise<IProjectModelEntity | null> {
      const existProject = await projectDB.findOne({
         project_name: { $regex: new RegExp(`^${ project_name }$`, 'i') }
      });

      return existProject
   }
   async saveProject(project_name: string, user_id: string, address: string, mobile_number: number, email: string, area: string, description: string, status: string): Promise<void> {
      const newProject = new projectDB({
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
   async findProjectInEdit(_id: string, project_name: string): Promise<IProjectModelEntity | null> {
      const existProject = await projectDB.findOne({ _id: { $ne: _id }, project_name: { $regex: new RegExp(`^${ project_name }$`, 'i') } })
      return existProject
   }
   async UpdateProjectById(_id: string, project_name: string, user_id: string, address: string, mobile_number: number, email: string, area: number, description: string): Promise<void> {
      await projectDB.findByIdAndUpdate(_id, { project_name, user_id, address, mobile_number, email, area, description })
   }
   async DeleteProjectById(_id: string): Promise<void> {
      await projectDB.findByIdAndDelete(_id)
   }
   async changeProjectStatus(_id: string, status: string): Promise<void> {
      await projectDB.findByIdAndUpdate(_id, { status })
   }
   async addSitemanagerToProject(_id: string, siteManager_id: string): Promise<void> {
      await projectDB.findByIdAndUpdate(_id, { $set: { sitemanager_id: siteManager_id } })
   }
   async removeSitemanagerInProject(_id: string, sitemanager_id: string): Promise<void> {
      await projectDB.findByIdAndUpdate(_id, { sitemanager_id: null })
   }
   async fetchProject(): Promise<IProjectModelEntity[] | []> {
      const x = await projectDB.find()
      return x
   }
   async findProjectWithCost(projectId: string): Promise<IProjectModelEntity | null> {
      const existStage = await projectDB.findOne({ _id: projectId })
      return existStage
   }
   async SetCostInProject(projectId: string, startDate: string, endDate: string, cost: number): Promise<void> {
      await projectDB.findByIdAndUpdate(projectId, { start_date: startDate, end_date: endDate, budgeted_cost: cost })
   }
   async findStageSetProject(search: string, page: number): Promise<{ data: IProjectModelEntity[], totalPage: number }> {
      const skip = page * 5
      const existStage = await projectDB.find({ budgeted_cost: { $ne: null }, project_name: { $regex: search, $options: "i" } }).skip(skip).limit(5)
      const totalPage = Math.ceil(await projectDB.countDocuments({ project_name: { $regex: search, $options: "i" } }) / 5)
      return { data: existStage, totalPage: totalPage }
   }
   async UpdateEstimationImage(url: string, _id: string): Promise<void> {
      await projectDB.findByIdAndUpdate(_id, { expected_image: url })
   }
   async findProjectByUserId(user_id: string): Promise<IProjectModelEntity[]> {
      const data = await projectDB.find({ user_id: user_id })
      return data
   }
   async findSitemanagerProject(user: string): Promise<IProjectModelEntity[]> {
      const data = await projectDB.find({ sitemanager_id: user })
      return data
   }
   async findStatusBaseProject(
      status: string,
      search: string,
      area: number,
      page: number
   ): Promise<{ data: IProjectModelEntity[]; totalPage: number,areas:number[] }> {
      const ITEMS_PER_PAGE = 6;
      const skip = page * ITEMS_PER_PAGE;
      let query;

      area==0 ?  query = {
         status,
         $or: [
            { project_name: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
         ],
      } : query ={
         status,
         area,
         $or: [
            { project_name: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
         ],
      }

      const [projects, count] = await Promise.all([
         projectDB.find(query).skip(skip).limit(ITEMS_PER_PAGE),
         projectDB.countDocuments(query),
      ]);

      const totalPage = Math.ceil(count / ITEMS_PER_PAGE);
      const allProject = await projectDB.find()
      let areas = []
      for(let element of allProject){
         areas.push(element.area)
      }
      let uniqueArea = [...new Set(areas.filter(element=>element!=undefined))].sort((a,b)=>a-b)

      return {
         data: projects,
         totalPage,
         areas:uniqueArea
      };
   }

}