import { AddsitetoprojectInput } from "../../../application/entities/addsitemanagertoproject.entity";
import { fetchprojectInput, userBaseChatoutput } from "../../../application/entities/project.entity";
import { IProjectModelEntity } from "../../Entities/modelEntities/project.entity";

export interface IprojectRepository {
   findAggreagateProjectsByUserId(_id: string): Promise<userBaseChatoutput[]>
   findProjectByName(project_name: string): Promise<IProjectModelEntity | null>
   fetchProject(): Promise<IProjectModelEntity[]>
   findProjectWithCost(projectId: string): Promise<IProjectModelEntity | null>
   findProjectInEdit(_id: string, project_name: string): Promise<IProjectModelEntity | null>
   DeleteProjectById(_id: string): Promise<void>
   findProjectByUserId(user_id: string): Promise<IProjectModelEntity[]>
   findSitemanagerProject(user: string): Promise<IProjectModelEntity[]>
   addSitemanagerToProject(input: AddsitetoprojectInput): Promise<void>
   removeSitemanagerInProject(input:AddsitetoprojectInput): Promise<void>
   UpdateEstimationImage(url: string, _id: string): Promise<void>
   
   findAllProjectWithUser(input: listingInput): Promise<{ getProjectListData: any[]; totalPage: number }>
   saveProject(input: addProjectInput): Promise<void>;
   UpdateProjectById(input: editProjectInput): Promise<void>;
   changeProjectStatus(_id: string, status: string): Promise<void>
   SetCostInProject(input: costInput): Promise<void>
   findStageSetProject(input: listingInput): Promise<{ data: IProjectModelEntity[], totalPage: number }>

   findStatusBaseProject(input: fetchprojectInput): Promise<{ data: IProjectModelEntity[], totalPage: number, areas: number[] }>
   findProjectById(_id: string): Promise<IProjectModelEntity | null>

   findProjectsBySitemanager(_id: string): Promise<chatListUserData[]>
}