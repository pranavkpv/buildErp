import { projectDB } from "../../api/models/ProjectModel";
import { chatListDTO } from "../../application/dto/user.dto";
import { AddsitetoprojectInput } from "../../application/Entities/addsitemanagertoproject.entity";
import { listingInput } from "../../application/Entities/common.entity";
import { addProjectInput, editProjectInput, projectwithClient, statusBaseProjectInput, userBaseChatoutput } from "../../application/Entities/project.entity";
import { costInput } from "../../application/Entities/stage.entity";
import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity";
import { IprojectRepository } from "../../domain/Entities/IRepository/IProject";


export class ProjectRepository implements IprojectRepository {

  // Get all projects with pagination and user details
  async getAllProjectsWithUser(input: listingInput):
    Promise<{ getProjectListData: projectwithClient[]; totalPage: number }> {
    const { page, search } = input;
    const skip = page * 5;
    const searchRegex = new RegExp(search, "i");

    const projectData = await projectDB.aggregate([
      { $addFields: { userObjectId: { $toObjectId: "$user_id" } } },
      {
        $lookup: {
          from: "users",
          localField: "userObjectId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $match: {
          $or: [
            { project_name: { $regex: searchRegex } },
            { "userDetails.username": { $regex: searchRegex } }
          ]
        }
      }, { $unwind: "$userDetails" },
      { $skip: skip },
      { $limit: 5 }
    ]);

    const totalDoc = await projectDB.aggregate([
      { $addFields: { userObjectId: { $toObjectId: "$user_id" } } },
      {
        $lookup: {
          from: "users",
          localField: "userObjectId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $match: {
          $or: [
            { project_name: { $regex: searchRegex } },
            { "userDetails.username": { $regex: searchRegex } }
          ]
        }
      }
    ]);

    return {
      getProjectListData: projectData || [],
      totalPage: Math.ceil(totalDoc.length/5)
    };
  }
  // Get project by name
  async getProjectByName(project_name: string): Promise<IProjectModelEntity | null> {
    return await projectDB.findOne({
      project_name: { $regex: new RegExp(`^${ project_name }$`, "i") }
    });
  }

  //  Create new project
  async createProject(input: addProjectInput): Promise<void> {
    const { project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = input;
    const newProject = new projectDB({
      project_name,
      user_id,
      address,
      mobile_number,
      email,
      area,
      description,
      status: "pending",
      latitude,
      longitude
    });

    await newProject.save();
  }

  // Check duplicate project name while editing
  async checkDuplicateProjectInEdit(_id: string, project_name: string):
    Promise<IProjectModelEntity | null> {
    return await projectDB.findOne({
      _id: { $ne: _id },
      project_name: { $regex: new RegExp(`^${ project_name }$`, "i") }
    });
  }

  // Update project by ID
  async UpdateProjectById(input: editProjectInput): Promise<void> {
    const { _id, project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = input;
    await projectDB.findByIdAndUpdate(_id, {
      project_name,
      user_id,
      address,
      mobile_number,
      email,
      area,
      description,
      latitude,
      longitude
    });
  }

  // Delete project by ID
  async DeleteProjectById(_id: string): Promise<void> {
    await projectDB.findByIdAndDelete(_id);
  }

  // Update project status
  async updateProjectStatus(_id: string, status: string): Promise<void> {
    await projectDB.findByIdAndUpdate(_id, { status });
  }

  // Assign sitemanager to project
  async assignSitemanagerToProject(input: AddsitetoprojectInput): Promise<void> {
    await projectDB.findByIdAndUpdate(input.selectedproject, {
      $set: { sitemanager_id: input.siteManager_id }
    });
  }

  // Remove sitemanager from project
  async removeSitemanagerFromProject(input: AddsitetoprojectInput): Promise<void> {
    await projectDB.findByIdAndUpdate(input.selectedproject, { sitemanager_id: null });
  }

  // Get all projects (without pagination)
  async getAllProjects(): Promise<IProjectModelEntity[]> {
    return await projectDB.find();
  }

  // Get project with cost
  async getProjectWithCost(projectId: string): Promise<IProjectModelEntity | null> {
    return await projectDB.findOne({ _id: projectId });
  }

  // Set project cost
  async setProjectCost(input: costInput): Promise<void> {
    await projectDB.findByIdAndUpdate(input.projectId, {
      start_date: input.startDate,
      end_date: input.endDate,
      budgeted_cost: input.cost
    });
  }

  // Get projects with stage info and pagination
  async getProjectsWithStage(input: listingInput):
    Promise<{ data: IProjectModelEntity[]; totalPage: number }> {
      console.log(input)
    const skip = input.page * 5;

    const data = await projectDB.find({
      budgeted_cost: { $ne: null },
      project_name: { $regex: input.search, $options: "i" }
    }).skip(skip).limit(5);

    const totalPage = Math.ceil(
      await projectDB.countDocuments({
        budgeted_cost: { $ne: null },
        project_name: { $regex: input.search, $options: "i" }
      }) / 5
    );

    return { data, totalPage };
  }

  // Update estimation image by project ID
  async updateEstimationImageById(url: string, _id: string): Promise<void> {
    await projectDB.findByIdAndUpdate(_id, { expected_image: url });
  }

  // Get projects by user ID
  async getProjectsByUserId(user_id: string): Promise<IProjectModelEntity[]> {
    return await projectDB.find({ user_id });
  }

  // Get projects by sitemanager ID
  async getProjectsBySitemanagerId(user: string): Promise<IProjectModelEntity[]> {
    return await projectDB.find({ sitemanager_id: user });
  }

  // Get projects by status with pagination
  async getProjectsByStatus(input: statusBaseProjectInput):
    Promise<{ data: IProjectModelEntity[]; totalPage: number; areas: number[] }> {
    const ITEMS_PER_PAGE = 6;
    const skip = input.page * ITEMS_PER_PAGE;

    const query = input.area === 0
      ? {
        status: input.status,
        $or: [
          { project_name: { $regex: input.search, $options: "i" } },
          { address: { $regex: input.search, $options: "i" } }
        ]
      }
      : {
        status: input.status,
        area: input.area,
        $or: [
          { project_name: { $regex: input.search, $options: "i" } },
          { address: { $regex: input.search, $options: "i" } }
        ]
      };

    const [projects, count] = await Promise.all([
      projectDB.find(query).skip(skip).limit(ITEMS_PER_PAGE),
      projectDB.countDocuments(query)
    ]);

    const allAreas = (await projectDB.find())
      .map(p => p.area)
      .filter(a => a !== undefined);

    const uniqueAreas = [...new Set(allAreas)].sort((a, b) => a - b);

    return { data: projects, totalPage: Math.ceil(count / ITEMS_PER_PAGE), areas: uniqueAreas };
  }

  //  Get project by ID
  async getProjectById(_id: string): Promise<IProjectModelEntity | null> {
    return await projectDB.findById(_id);
  }

  // Get user’s chat-related projects
  async getUserChatProjects(_id: string): Promise<userBaseChatoutput[]> {
    const data = await projectDB.aggregate([
      { $match: { user_id: _id, sitemanager_id: { $ne: null } } },
      {
        $addFields: {
          userObjectId: { $toObjectId: "$user_id" },
          sitemanagerObjectId: { $toObjectId: "$sitemanager_id" }
        }
      },
      { $lookup: { from: "users", localField: "userObjectId", foreignField: "_id", as: "userDetails" } },
      { $lookup: { from: "sitemanagers", localField: "sitemanagerObjectId", foreignField: "_id", as: "sitemanagerDetails" } },
      { $unwind: "$userDetails" },
      { $unwind: "$sitemanagerDetails" }
    ]);

    const result: userBaseChatoutput[] = [];

    for (const element of data) {
      if (!result.some(r => r.sitemanager_id === element.sitemanager_id)) {
        result.push({
          _id: element._id,
          project_name: element.project_name,
          sitemanager_id: element.sitemanager_id,
          sitemanager_name: element.sitemanagerDetails.username,
          sitemanager_image: element.sitemanagerDetails.image,
          user_id: element.user_id,
          username: element.userDetails.username
        });
      }
    }

    return result;
  }

  // Get sitemanager’s chat-related projects
  async getSitemanagerChatProjects(_id: string): Promise<chatListDTO[]> {
    const data = await projectDB.aggregate([
      { $match: { sitemanager_id: _id } },
      { $addFields: { userObjectId: { $toObjectId: "$user_id" } } },
      { $lookup: { from: "users", localField: "userObjectId", foreignField: "_id", as: "userDetails" } },
      { $unwind: "$userDetails" }
    ]);

    const result: chatListDTO[] = [];

    for (const element of data) {
      if (!result.some(r => r.user_id === element.userDetails._id)) {
        result.push({
          _id: element._id,
          project_name: element.project_name,
          user_id: element.user_id,
          username: element.userDetails.username,
          user_image: element.userDetails.profile_image
        });
      }
    }

    return result;
  }
}
