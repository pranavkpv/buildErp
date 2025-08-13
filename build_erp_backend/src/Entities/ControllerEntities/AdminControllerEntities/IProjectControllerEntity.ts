import { NextFunction, Request, Response } from "express"
import { IUserModelEntity } from "../../ModelEntities/User.Entity";
import { commonOutput } from "../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../DTO/ProjectEntities/project";
import { userOutput } from "../../../DTO/UserEntities/user";

export interface IProjectControllerEntity {
   projectData(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
   addProjectdata(req: Request, res: Response, next: NextFunction): Promise<userOutput | commonOutput>
   saveProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   updateProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   projectStatus(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   getProject(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>

}