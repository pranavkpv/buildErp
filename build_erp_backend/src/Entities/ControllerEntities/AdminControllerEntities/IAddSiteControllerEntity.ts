import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../DTO/CommonEntities/common";
import { sitemanagerOutput } from "../../../DTO/SitemanagerEntities/sitemanager";
import { projectOutput } from "../../../DTO/ProjectEntities/project";

export interface IAddSiteControllerEntity {
   saveData(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   listSite(req: Request, res: Response, next: NextFunction): Promise<sitemanagerOutput | commonOutput>
   deleteSite(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchProject(req: Request, res: Response, next: NextFunction):  Promise<projectOutput | commonOutput >
   fetchSitemanager(req: Request, res: Response, next: NextFunction): Promise<sitemanagerOutput| commonOutput>
}