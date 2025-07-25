import { NextFunction, Request, Response } from "express"

export interface IProjectControllerEntity {
   projectData(req: Request, res: Response, next: NextFunction): Promise<void>
   addProjectdata(req: Request, res: Response, next: NextFunction): Promise<void>
   saveProject(req: Request, res: Response, next: NextFunction): Promise<void>
   updateProject(req: Request, res: Response, next: NextFunction): Promise<void>
   removeProject(req: Request, res: Response, next: NextFunction): Promise<void>
   projectStatus(req: Request, res: Response, next: NextFunction): Promise<void>
   getProject(req: Request, res: Response, next: NextFunction): Promise<void>

}