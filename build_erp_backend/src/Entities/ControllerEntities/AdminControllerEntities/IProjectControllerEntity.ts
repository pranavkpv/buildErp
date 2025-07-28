import { NextFunction, Request, Response } from "express"
import { IUserModelEntity } from "../../ModelEntities/User.Entity";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";

export interface IProjectControllerEntity {
   projectData(req: Request, res: Response, next: NextFunction): Promise<{getProjectListData:any[];totalPage:number } | commonOutput>
   addProjectdata(req: Request, res: Response, next: NextFunction): Promise<IUserModelEntity[] | [] | commonOutput>
   saveProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   updateProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   projectStatus(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   getProject(req: Request, res: Response, next: NextFunction): Promise<IProjectModelEntity[] | commonOutput>

}