import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { FetchsitemanagerInListDTO, listAddsiteDTO } from '../../../application/dto/addsitemanagerToproject';


export interface IAddSiteManagerToProjectController {

   fetchSiteManagers(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<FetchsitemanagerInListDTO[]> | commonOutput | void>

   addSiteManagerToProject(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void>

   removeSiteManagerFromProject(req: Request, res: Response, next: NextFunction):
    Promise<commonOutput | void>

   listProjectsWithSiteManagers(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<{ data: listAddsiteDTO[], totalPage: number }> | commonOutput | void>
   
}