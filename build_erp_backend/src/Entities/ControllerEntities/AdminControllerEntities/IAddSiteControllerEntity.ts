import { NextFunction, Request, Response } from "express";

export interface IAddSiteControllerEntity {
   saveData(req: Request, res: Response, next: NextFunction): Promise<void>
   listSite(req: Request, res: Response, next: NextFunction): Promise<void>
   deleteSite(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchProject(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchSitemanager(req: Request, res: Response, next: NextFunction): Promise<void>
}