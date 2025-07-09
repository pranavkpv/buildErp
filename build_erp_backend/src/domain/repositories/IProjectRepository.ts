import { projectWithSitemanager } from "../types/addSite";
import { getProjectListData, Project } from "../types/project";

export interface IprojectRepository{
   findAllProjectWithUser(page:number,search:string):Promise<{getProjectListData:any[];totalPage:number }>
   findProjectByName(project_name:string):Promise<Project | null>
   saveProject( project_name:string,user_id:string,address:string,mobile_number:number,email:string,area:string,description:string,status:string):Promise<void>;
   findProjectInEdit(_id:string,project_name:string):Promise<Project | null>
   UpdateProjectById(_id:string,project_name:string,user_id:string,address:string,mobile_number:number,email:string,area:number,description:string):Promise<void>;
   DeleteProjectById(_id:string):Promise<void>
   changeProjectStatus(_id:string,status:string):Promise<void>
   addSitemanagerToProject(_id:string,siteManager_id:string):Promise<void>
   removeSitemanagerInProject(_id:string,sitemanager_id:string):Promise<void>
   fetchProject():Promise<Project[]>
   findProjectWithCost(projectId:string):Promise<Project | null>
   SetCostInProject(projectId:string,startDate:string,endDate:string,cost:number):Promise<void>
   findStageSetProject(search:string,page:number):Promise<{data:Project[],totalPage:number}>
   UpdateEstimationImage(url:string,_id:string):Promise<void>
   findProjectByUserId(user_id:string):Promise<Project[]>
}