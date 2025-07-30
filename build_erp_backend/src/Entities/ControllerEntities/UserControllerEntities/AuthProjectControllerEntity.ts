import { NextFunction, Request, Response } from "express-serve-static-core";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../Input-OutputEntities/ProjectEntities/project";

export interface IAuthProjectControllerEntity {
   fetchProject(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
   fetchProjectStatusBaseProject(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
}