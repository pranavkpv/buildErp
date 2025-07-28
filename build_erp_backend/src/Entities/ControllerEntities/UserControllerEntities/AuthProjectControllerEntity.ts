import { NextFunction, Request, Response } from "express-serve-static-core";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";

export interface IAuthProjectControllerEntity {
   fetchProject(req: Request, res: Response, next: NextFunction): Promise<IProjectModelEntity[] | void | commonOutput>
   fetchProjectStatusBaseProject(req: Request, res: Response, next: NextFunction): Promise<{ data: IProjectModelEntity[], totalPage: number, areas: number[] } | commonOutput>
}