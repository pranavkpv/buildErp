import { chatListData, chatListUserData } from "../../../DTO/Chat.Entities/Chatlist.Entity";
import { listingInput } from "../../../DTO/CommonEntities/common";
import { addProjectInput, addSitToProjectInput, costInput, editProjectInput, statusBaseProjectInput } from "../../../DTO/ProjectEntities/project";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";

export interface IprojectRepositoryEntity {
   findAllProjectWithUser(input: listingInput): Promise<{ getProjectListData: any[]; totalPage: number }>
   findProjectByName(project_name: string): Promise<IProjectModelEntity | null>
   saveProject(input: addProjectInput): Promise<void>;
   findProjectInEdit(_id: string, project_name: string): Promise<IProjectModelEntity | null>
   UpdateProjectById(input: editProjectInput): Promise<void>;
   DeleteProjectById(_id: string): Promise<void>
   changeProjectStatus(_id: string, status: string): Promise<void>
   addSitemanagerToProject(input: addSitToProjectInput): Promise<void>
   removeSitemanagerInProject(input: addSitToProjectInput): Promise<void>
   fetchProject(): Promise<IProjectModelEntity[]>
   findProjectWithCost(projectId: string): Promise<IProjectModelEntity | null>
   SetCostInProject(input: costInput): Promise<void>
   findStageSetProject(input: listingInput): Promise<{ data: IProjectModelEntity[], totalPage: number }>
   UpdateEstimationImage(url: string, _id: string): Promise<void>
   findProjectByUserId(user_id: string): Promise<IProjectModelEntity[]>
   findSitemanagerProject(user: string): Promise<IProjectModelEntity[]>
   findStatusBaseProject(input: statusBaseProjectInput): Promise<{ data: IProjectModelEntity[], totalPage: number, areas: number[] }>
   findProjectById(_id: string): Promise<IProjectModelEntity | null>
   findAggreagateProjectsByUserId(_id: string): Promise<chatListData[]>
   findProjectsBySitemanager(_id: string): Promise<chatListUserData[]>
}