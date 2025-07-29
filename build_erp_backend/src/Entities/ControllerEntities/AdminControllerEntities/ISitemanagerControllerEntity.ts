import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { sitemanagerOutput } from "../../Input-OutputEntities/SitemanagerEntities/sitemanager";
import { projectOutput } from "../../Input-OutputEntities/ProjectEntities/project";

export interface ISitemanagerControllerEntity {
   getSitemanager(req: Request, res: Response, next: NextFunction): Promise<sitemanagerOutput | commonOutput>
   addSitemanager(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   editSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   deleteSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   loginSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   logoutSitemanager(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   getSitemanagerProject(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
}