import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../../application/dto/common"
import { listSitemanagerDTO } from "../../../../application/dto/sitemanager.dto"
import { ISitemanagerModelEntity } from "../../modelEntities/sitemanager.entity"
import { Tokens } from "../../../../application/entities/token.entity"
import { IProjectModelEntity } from "../../modelEntities/project.entity"


export interface ISitemanagerControllerEntity {
   getSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:listSitemanagerDTO[],totalPage:number}> | commonOutput>
   addSitemanager(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   editSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   deleteSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   loginSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:ISitemanagerModelEntity,token:Tokens}> | commonOutput>
   logoutSitemanager(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   getSitemanagerProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput<IProjectModelEntity[]> | commonOutput>
}