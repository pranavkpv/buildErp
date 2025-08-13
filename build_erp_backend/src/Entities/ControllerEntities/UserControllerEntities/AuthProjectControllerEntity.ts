import { NextFunction, Request, Response } from "express-serve-static-core";
import { commonOutput } from "../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../DTO/ProjectEntities/project";

export interface IAuthProjectControllerEntity {
   fetchProject(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
   fetchProjectStatusBaseProject(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
}