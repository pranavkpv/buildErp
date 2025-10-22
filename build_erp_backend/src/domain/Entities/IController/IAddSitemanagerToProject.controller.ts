import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { FetchsitemanagerInListDTO, listAddsiteDTO } from '../../../application/dto/addsitemanagerToproject';


export interface IAddSiteManagerToProjectController {

   getAllSiteManagers (req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<FetchsitemanagerInListDTO[]> | commonOutput | void>

   createSiteManagerAssignment (req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void>

   deleteSiteManagerAssignment (req: Request, res: Response, next: NextFunction):
    Promise<commonOutput | void>

   getProjectsWithSiteManagers (req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<{ data: listAddsiteDTO[], totalPage: number }> | commonOutput | void>
}