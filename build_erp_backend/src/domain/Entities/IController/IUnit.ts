import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { idUnitnameDTO, listUnitDTO } from "../../../application/dto/unit.dto";

export interface IUnitController {
   createUnit(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deleteUnit(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   fetchAllUnits(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<idUnitnameDTO[]> | void>

   updateUnit(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getUnits(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listUnitDTO[]; totalPage: number }> | void>
}