import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { idBrandnameDTO } from "../../../application/dto/brand.dto";

export interface IBrandController {
   addBrandHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>;
   removeBrandHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>;
   brandListHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:idBrandnameDTO[],totalPage:number}>>
   editBrandHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> 
}