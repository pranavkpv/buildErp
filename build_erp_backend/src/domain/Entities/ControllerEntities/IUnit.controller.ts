import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { idUnitnameDTO, listUnitDTO } from "../../../application/dto/unit.dto";

export interface IUnitController {
   addUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   displayAllUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput<idUnitnameDTO[]>>
   editUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   getUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:listUnitDTO[],totalPage:number}>>
}