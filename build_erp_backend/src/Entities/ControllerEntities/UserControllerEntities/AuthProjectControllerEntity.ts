import { NextFunction, Request, Response } from "express-serve-static-core";

export interface IAuthProjectControllerEntity {
   fetchProject(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchProjectStatusBaseProject(req: Request, res: Response, next: NextFunction): Promise<void>
}