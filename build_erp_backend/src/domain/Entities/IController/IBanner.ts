import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { listBannerDTO } from "../../../application/dto/banner.dto";

export interface IBannerController {

   addBanner(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getBanner(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listBannerDTO[], totalPage: number }> | void>

   editBanner(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deleteBanner(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>
}