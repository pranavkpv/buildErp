import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";
import { ISitemanagerModelEntity } from "../../ModelEntities/Sitemanager.Entity";

export interface IAddSiteControllerEntity {
   saveData(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   listSite(req: Request, res: Response, next: NextFunction): Promise<{ getAddSiteData: any[]; totalPage: number } | commonOutput>
   deleteSite(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchProject(req: Request, res: Response, next: NextFunction):  Promise<IProjectModelEntity[] | null | commonOutput >
   fetchSitemanager(req: Request, res: Response, next: NextFunction): Promise<ISitemanagerModelEntity[] | null | commonOutput>
}