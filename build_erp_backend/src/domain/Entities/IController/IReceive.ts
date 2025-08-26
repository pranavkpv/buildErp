import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { RecieveOutput } from "../../../application/dto/receive.dto";


export interface IReceiveController {

   saveReceive(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getReceive(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: RecieveOutput[], totalPage: number }> | commonOutput | void>

   updateReceive(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deleteReceive(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   approveReceive(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>
}