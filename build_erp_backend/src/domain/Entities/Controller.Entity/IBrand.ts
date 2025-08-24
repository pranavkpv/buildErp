import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { idBrandnameDTO } from "../../../application/dto/brand.dto";

export interface IBrandController {

   addBrand(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   deleteBrand(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   getAllBrands(req: Request, res: Response, next: NextFunction):
       Promise<commonOutput<{ data: idBrandnameDTO[], totalPage: number }> | void>

   updateBrand(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>
}