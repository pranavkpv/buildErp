import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";

export interface ISitemanagerControllerEntity {
   getSitemanager(req: Request, res: Response, next: NextFunction): Promise<{getSiteData:any[];totalPage:number } | commonOutput>
   addSitemanager(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   editSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   deleteSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   loginSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   logoutSitemanager(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   getSitemanagerProject(req: Request, res: Response, next: NextFunction): Promise<IProjectModelEntity[] | commonOutput>
}