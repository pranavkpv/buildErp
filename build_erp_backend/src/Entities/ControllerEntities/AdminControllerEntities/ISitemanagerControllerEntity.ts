import { NextFunction, Request, Response } from "express"

export interface ISitemanagerControllerEntity {
   getSitemanager(req: Request, res: Response, next: NextFunction): Promise<void>
   addSitemanager(req: Request, res: Response, next: NextFunction): Promise<void>
   editSitemanager(req: Request, res: Response, next: NextFunction): Promise<void>
   deleteSitemanager(req: Request, res: Response, next: NextFunction): Promise<void>
   loginSitemanager(req: Request, res: Response, next: NextFunction): Promise<void>
   logoutSitemanager(req: Request, res: Response, next: NextFunction): Promise<void>
   getSitemanagerProject(req: Request, res: Response, next: NextFunction): Promise<void>
}