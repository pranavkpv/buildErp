import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { sitemanagerOutput } from "../../Input-OutputEntities/SitemanagerEntities/sitemanager";
import { projectOutput } from "../../Input-OutputEntities/ProjectEntities/project";

export interface IAddSiteControllerEntity {
   saveData(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   listSite(req: Request, res: Response, next: NextFunction): Promise<sitemanagerOutput | commonOutput>
   deleteSite(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchProject(req: Request, res: Response, next: NextFunction):  Promise<projectOutput | commonOutput >
   fetchSitemanager(req: Request, res: Response, next: NextFunction): Promise<sitemanagerOutput| commonOutput>
}