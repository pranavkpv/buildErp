import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../application/dto/common"
import { listSitemanagerDTO } from "../../../application/dto/sitemanager.dto"
import { ISitemanagerModelEntity } from "../modelEntities/sitemanager.entity"
import { Tokens } from "../../../application/Entities/token.entity"
import { IProjectModelEntity } from "../modelEntities/project.entity"


export interface ISitemanagerController {
   
   getSitemanagers(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listSitemanagerDTO[], totalPage: number }> | commonOutput | void>

   createSitemanager(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   updateSitemanager(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deleteSitemanager(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   loginSitemanager(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: ISitemanagerModelEntity, token: Tokens }> | commonOutput | void>

   logoutSitemanager(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getSitemanagerProjects(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<IProjectModelEntity[]> | commonOutput | void>

   changePassword(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

}