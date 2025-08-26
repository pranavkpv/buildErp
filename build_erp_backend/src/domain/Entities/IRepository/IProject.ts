import { chatListDTO } from "../../../application/dto/user.dto";
import { AddsitetoprojectInput } from "../../../application/Entities/addsitemanagertoproject.entity";
import { listingInput } from "../../../application/Entities/common.entity";
import { addProjectInput, editProjectInput, fetchprojectInput, projectwithClient, userBaseChatoutput } from "../../../application/Entities/project.entity";
import { costInput } from "../../../application/Entities/stage.entity";
import { IProjectModelEntity } from "../modelEntities/project.entity";

export interface IprojectRepository {

   getAllProjectsWithUser(input: listingInput):
      Promise<{ getProjectListData: projectwithClient[]; totalPage: number }>

   getProjectByName(project_name: string):
      Promise<IProjectModelEntity | null>

   createProject(input: addProjectInput):
      Promise<void>;

   checkDuplicateProjectInEdit(_id: string, project_name: string):
      Promise<IProjectModelEntity | null>

   UpdateProjectById(input: editProjectInput):
      Promise<void>;

   DeleteProjectById(_id: string):
      Promise<void>

   updateProjectStatus(_id: string, status: string):
      Promise<void>

   assignSitemanagerToProject(input: AddsitetoprojectInput):
      Promise<void>

   removeSitemanagerFromProject(input: AddsitetoprojectInput):
      Promise<void>

   getAllProjects():
      Promise<IProjectModelEntity[]>

   getProjectWithCost(projectId: string):
      Promise<IProjectModelEntity | null>

   setProjectCost(input: costInput):
      Promise<void>

   getProjectsWithStage(input: listingInput):
      Promise<{ data: IProjectModelEntity[], totalPage: number }>

   updateEstimationImageById(url: string, _id: string):
      Promise<void>

   getProjectsByUserId(user_id: string):
      Promise<IProjectModelEntity[]>

   getProjectsBySitemanagerId(user: string):
      Promise<IProjectModelEntity[]>

   getProjectsByStatus(input: fetchprojectInput):
      Promise<{ data: IProjectModelEntity[], totalPage: number, areas: number[] }>

   getProjectById(_id: string):
      Promise<IProjectModelEntity | null>

   getUserChatProjects(_id: string):
      Promise<userBaseChatoutput[]>

   getSitemanagerChatProjects(_id: string):
      Promise<chatListDTO[]>

}
