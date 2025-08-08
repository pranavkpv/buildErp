import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";

export interface IprojectRepository{
   findAllProjectWithUser(page:number,search:string):Promise<{getProjectListData:any[];totalPage:number }>
   findProjectByName(project_name:string):Promise<IProjectModelEntity | null>
   saveProject( project_name:string,user_id:string,address:string,mobile_number:number,email:string,area:string,description:string,status:string,latitude:number,longitude:number ):Promise<void>;
   findProjectInEdit(_id:string,project_name:string):Promise<IProjectModelEntity | null>
   UpdateProjectById(_id:string,project_name:string,user_id:string,address:string,mobile_number:number,email:string,area:number,description:string,latitude:number,longitude:number):Promise<void>;
   DeleteProjectById(_id:string):Promise<void>
   changeProjectStatus(_id:string,status:string):Promise<void>
   addSitemanagerToProject(_id:string,siteManager_id:string):Promise<void>
   removeSitemanagerInProject(_id:string,sitemanager_id:string):Promise<void>
   fetchProject():Promise<IProjectModelEntity[]>
   findProjectWithCost(projectId:string):Promise<IProjectModelEntity | null>
   SetCostInProject(projectId:string,startDate:string,endDate:string,cost:number):Promise<void>
   findStageSetProject(search:string,page:number):Promise<{data:IProjectModelEntity[],totalPage:number}>
   UpdateEstimationImage(url:string,_id:string):Promise<void>
   findProjectByUserId(user_id:string):Promise<IProjectModelEntity[]>
   findSitemanagerProject(user:string):Promise<IProjectModelEntity[]>
   findStatusBaseProject(status: string,search:string,area:number,page:number): Promise<{data:IProjectModelEntity[],totalPage:number,areas:number[]}>
   findProjectById(_id:string):Promise<IProjectModelEntity | null>
}