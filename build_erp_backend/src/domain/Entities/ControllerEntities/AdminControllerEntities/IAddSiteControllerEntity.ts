import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../../application/dto/common";
import { FetchsitemanagerInListDTO, listAddsiteDTO } from "../../../../application/dto/addsitemanagerToproject";


export interface IAddSiteManagerToProjectController {
   saveData(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   listSite(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: listAddsiteDTO[], totalPage: number }> | commonOutput>
   deleteSite(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchSitemanager(req: Request, res: Response, next: NextFunction): Promise<commonOutput<FetchsitemanagerInListDTO[]> | commonOutput>
}