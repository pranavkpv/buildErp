import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../../application/dto/CommonEntities/common";
import { sitemanagerOutput } from "../../../../application/dto/SitemanagerEntities/sitemanager";
import { projectOutput } from "../../../../application/dto/ProjectEntities/project";

export interface ISitemanagerControllerEntity {
   getSitemanager(req: Request, res: Response, next: NextFunction): Promise<sitemanagerOutput | commonOutput>
   addSitemanager(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   editSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   deleteSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   loginSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   logoutSitemanager(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   getSitemanagerProject(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
}