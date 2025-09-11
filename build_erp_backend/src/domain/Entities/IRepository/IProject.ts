import { chatListDTO } from '../../../application/dto/user.dto';
import { AddsitetoprojectInput } from '../../../application/Entities/addsitemanagertoproject.entity';
import { listingInput } from '../../../application/Entities/common.entity';
import { addProjectInput, editProjectInput, fetchprojectInput, groupedProjectwithStatus, projectwithClient, userBaseChatoutput } from '../../../application/Entities/project.entity';
import { costInput } from '../../../application/Entities/stage.entity';
import { IProjectModelEntity } from '../modelEntities/project.entity';

export interface IprojectRepository {

   getAllProjectsWithUser(input: listingInput):
      Promise<{ getProjectListData: projectwithClient[]; totalPage: number }>

   getProjectByName(projectname: string):
      Promise<IProjectModelEntity | null>

   createProject(input: addProjectInput):
      Promise<void>;

   checkDuplicateProjectInEdit(id: string, projectname: string):
      Promise<IProjectModelEntity | null>

   UpdateProjectById(input: editProjectInput):
      Promise<void>;

   DeleteProjectById(id: string):
      Promise<void>

   updateProjectStatus(id: string, status: string):
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

   updateEstimationImageById(url: string, id: string):
      Promise<void>

   getProjectsByUserId(userId: string):
      Promise<IProjectModelEntity[]>

   getProjectsBySitemanagerId(user: string):
      Promise<IProjectModelEntity[]>

   getProjectsByStatus(input: fetchprojectInput):
      Promise<{ data: IProjectModelEntity[], totalPage: number, areas: number[] }>

   getProjectById(id: string):
      Promise<IProjectModelEntity | null>

   getUserChatProjects(id: string):
      Promise<userBaseChatoutput[]>

   getSitemanagerChatProjects(id: string):
      Promise<chatListDTO[]>

   getGroupProjectByStatus():
      Promise<groupedProjectwithStatus[]>

   updateEstimatedUser(user: string, projectId: string):
      Promise<void>

   updateEstimationStatus(status: boolean,id:string):
      Promise<void>
}
